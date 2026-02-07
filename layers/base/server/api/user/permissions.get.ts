import { serverSupabaseUser } from "#supabase/server";
import { serverSupabaseServiceRole } from "#supabase/server";
import type { Permission, PermissionModule, PermissionAction } from "../../../types";

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  const supabase = await serverSupabaseServiceRole(event);

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  try {
    // 1. Get profile first (role_id and role) so we can return role in every response
    const { data: profile } = await supabase
      .from("profiles")
      .select("role_id, role")
      .eq("id", user.id)
      .single();

    let roleId = profile?.role_id ?? null;
    let roleName = profile?.role ?? user.user_metadata?.role ?? "employee";

    const resolveRoleForResponse = async (): Promise<string> => {
      if (profile?.role && String(profile.role).trim()) return String(profile.role).toLowerCase().replace(/-/g, "_");
      if (user.user_metadata?.role) return String(user.user_metadata.role).toLowerCase().replace(/-/g, "_");
      if (roleId) {
        const { data: r } = await supabase.from("roles").select("name").eq("id", roleId).single();
        if (r?.name) return r.name.toLowerCase().replace(/-/g, "_");
      }
      return "employee";
    };

    // 2. Optional: try user_permissions cache (permissions jsonb)
    const { data: userPerms } = await supabase
      .from("user_permissions")
      .select("permissions")
      .eq("user_id", user.id)
      .single();

    if (userPerms?.permissions && Array.isArray(userPerms.permissions) && userPerms.permissions.length > 0) {
      const valid = userPerms.permissions.every(
        (p: unknown) =>
          p &&
          typeof p === "object" &&
          "module" in p &&
          "actions" in p &&
          Array.isArray((p as { actions: unknown }).actions),
      );
      if (valid) {
        const permissions: Permission[] = (userPerms.permissions as { module: string; actions: string[] }[]).map(
          (p) => ({
            module: p.module as PermissionModule,
            actions: p.actions as PermissionAction[],
          }),
        );
        const role = await resolveRoleForResponse();
        return { permissions, role };
      }
    }

    if (!roleId && roleName) {
      const { data: roleRow } = await supabase
        .from("roles")
        .select("id")
        .eq("name", roleName)
        .single();
      roleId = roleRow?.id ?? null;
    }

    // 3. Fetch from role_permissions (module, actions) - your existing schema
    const permissionsMap = new Map<string, string[]>();

    if (roleId) {
      const { data: rows, error } = await supabase
        .from("role_permissions")
        .select("module, actions")
        .eq("role_id", roleId);

      if (!error && rows?.length) {
        for (const row of rows as { module: string; actions: string[] | string }[]) {
          const module = row.module;
          let actions: string[] = [];
          if (Array.isArray(row.actions)) actions = row.actions;
          else if (typeof row.actions === "string") {
            try {
              const parsed = JSON.parse(row.actions);
              actions = Array.isArray(parsed) ? parsed : row.actions.split(",").map((s) => s.trim());
            } catch {
              actions = row.actions.split(",").map((s) => s.trim());
            }
          }
          if (!module) continue;
          if (!permissionsMap.has(module)) permissionsMap.set(module, []);
          for (const a of actions) {
            if (a && !permissionsMap.get(module)!.includes(a)) {
              permissionsMap.get(module)!.push(a);
            }
          }
        }
      }
    }

    if (permissionsMap.size > 0) {
      const permissions: Permission[] = Array.from(permissionsMap.entries()).map(
        ([module, actions]) => ({
          module: module as PermissionModule,
          actions: actions as PermissionAction[],
        }),
      );
      const role = await resolveRoleForResponse();
      return { permissions, role };
    }

    // 4. Resolve role name from role_id when profile.role is empty (e.g. after role_id backfill)
    let resolvedRoleName = roleName;
    if (roleId && (!profile?.role || !profile.role.trim())) {
      const { data: roleRow } = await supabase
        .from("roles")
        .select("name")
        .eq("id", roleId)
        .single();
      if (roleRow?.name) resolvedRoleName = roleRow.name;
    }

    // 5. Fallback: default permissions by role name
    const DEFAULT_ROLE_PERMISSIONS: Record<string, { module: string; actions: string[] }[]> = {
      admin: [],
      manager: [
        { module: "employees", actions: ["view"] },
        { module: "leave", actions: ["approve"] },
        { module: "payroll", actions: ["approve"] },
        { module: "reports", actions: ["view"] },
        { module: "performance", actions: ["view"] },
      ],
      hr: [
        { module: "employees", actions: ["view", "create", "edit", "delete"] },
        { module: "attendance", actions: ["view", "create", "edit"] },
        { module: "leave", actions: ["view", "create", "edit", "approve"] },
        { module: "performance", actions: ["view", "create", "edit"] },
        { module: "recruitment", actions: ["view", "create", "edit"] },
        { module: "payroll", actions: ["view"] },
      ],
      employee: [
        { module: "leave", actions: ["create", "view"] },
        { module: "payroll", actions: ["view"] },
        { module: "attendance", actions: ["view", "create"] },
      ],
      accountant: [
        { module: "payroll", actions: ["create", "view", "approve", "edit"] },
        { module: "reports", actions: ["view", "create"] },
      ],
      inventory_manager: [{ module: "inventory", actions: ["view", "create", "edit"] }],
      maintenance_technician: [
        { module: "maintenance", actions: ["view", "edit"] },
        { module: "inventory", actions: ["view"] },
      ],
      system_auditor: [
        { module: "reports", actions: ["view"] },
        { module: "audit", actions: ["view"] },
      ],
      td_officer: [
        { module: "training", actions: ["view", "create", "edit", "approve"] },
        { module: "reports", actions: ["view"] },
      ],
    };

    const lower = resolvedRoleName?.toLowerCase().replace(/-/g, "_") ?? "employee";
    const defaults = DEFAULT_ROLE_PERMISSIONS[lower] ?? DEFAULT_ROLE_PERMISSIONS.employee ?? [];
    const permissions: Permission[] = defaults.map((p) => ({
      module: p.module as PermissionModule,
      actions: p.actions as PermissionAction[],
    }));

    const role = lower;
    return { permissions, role };
  } catch (error) {
    console.error("Error in permissions endpoint:", error);
    return { permissions: [], role: "employee" };
  }
});
