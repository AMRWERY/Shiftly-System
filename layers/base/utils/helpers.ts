export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const generateId = (prefix = ''): string => {
  const id = crypto.randomUUID()
  return prefix ? `${prefix}-${id}` : id
}

export const generateCode = (prefix = '', digits = 4): string => {
  const num = Math.floor(Math.random() * 10 ** digits)
    .toString()
    .padStart(digits, '0')
  return prefix ? `${prefix}-${num}` : num
}

export const debounce = <T extends (...args: unknown[]) => unknown>(fn: T, delay: number): (...args: Parameters<T>) => void => {
  let timeout: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), delay)
  }
}

export const groupBy = <T>(arr: T[], key: keyof T): Record<string, T[]> => {
  return arr.reduce((acc, item) => {
    const group = String(item[key])
    if (!acc[group]) acc[group] = []
    acc[group].push(item)
    return acc
  }, {} as Record<string, T[]>)
}

export const sortBy = <T>(arr: T[], key: keyof T, ascending = true): T[] => {
  return [...arr].sort((a, b) => {
    const valA = a[key]
    const valB = b[key]
    if (valA < valB) return ascending ? -1 : 1
    if (valA > valB) return ascending ? 1 : -1
    return 0
  })
}

export const omit = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> => {
  const result = { ...obj }
  keys.forEach((k) => delete result[k])
  return result as Omit<T, K>
}

export const pick = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> => {
  return keys.reduce((acc, k) => {
    acc[k] = obj[k]
    return acc
  }, {} as Pick<T, K>)
}

export const truncate = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) return str
  return `${str.slice(0, maxLength - 3)}...`
}

export const toTitleCase = (str: string): string => {
  return str.replace(/\b\w/g, (c) => c.toUpperCase())
}

export const toSnakeCase = (str: string): string => {
  return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()
}

export const toCamelCase = (str: string): string => {
  return str.replace(/_([a-z])/g, (_, c) => c.toUpperCase())
}
