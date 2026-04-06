export function usePermissions() {
  const role = useRole()

  function can(permission: string): boolean {
    return role.hasPermission(permission)
  }

  function canAny(...permissions: string[]): boolean {
    return permissions.some((p) => can(p))
  }

  function canAll(...permissions: string[]): boolean {
    return permissions.every((p) => can(p))
  }

  return { can, canAny, canAll }
}
