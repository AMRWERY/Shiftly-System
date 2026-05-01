export const usePermissions = () => {
  const role = useRole()

  const can = (permission: string): boolean => {
    return role.hasPermission(permission)
  }

  const canAny = (...permissions: string[]): boolean => {
    return permissions.some((p) => can(p))
  }

  const canAll = (...permissions: string[]): boolean => {
    return permissions.every((p) => can(p))
  }

  return { can, canAny, canAll }
}
