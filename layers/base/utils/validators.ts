import { MAX_FILE_SIZE_BYTES, ALLOWED_IMAGE_TYPES } from './constants'

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function isPhone(value: string): boolean {
  return /^\+?[\d\s\-()]{7,15}$/.test(value)
}

export function isStrongPassword(value: string): boolean {
  return value.length >= 8
    && /[A-Z]/.test(value)
    && /[a-z]/.test(value)
    && /\d/.test(value)
}

export function isRequired(value: unknown): boolean {
  if (value === null || value === undefined) return false
  if (typeof value === 'string') return value.trim().length > 0
  if (Array.isArray(value)) return value.length > 0
  return true
}

export function isDate(value: string): boolean {
  const d = new Date(value)
  return !isNaN(d.getTime())
}

export function isFutureDate(value: string): boolean {
  return isDate(value) && new Date(value) > new Date()
}

export function isPastDate(value: string): boolean {
  return isDate(value) && new Date(value) < new Date()
}

export function isPositiveNumber(value: number): boolean {
  return typeof value === 'number' && value > 0
}

export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max
}

export function isAllowedImageFile(file: File): { valid: boolean; error?: string } {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type as typeof ALLOWED_IMAGE_TYPES[number])) {
    return { valid: false, error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.' }
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return { valid: false, error: `File size must be less than ${MAX_FILE_SIZE_BYTES / (1024 * 1024)}MB.` }
  }
  return { valid: true }
}

export function isUrl(value: string): boolean {
  try {
    new URL(value)
    return true
  }
  catch {
    return false
  }
}
