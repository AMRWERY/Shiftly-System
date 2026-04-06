export const APP_NAME = 'Shiftly ERP'
export const APP_VERSION = '1.0.0'

export const DEFAULT_PAGE_SIZE = 20
export const MAX_FILE_SIZE_MB = 3
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024

export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
] as const

export const ALLOWED_DOCUMENT_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
] as const

export const DATE_FORMAT = 'YYYY-MM-DD'
export const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
export const DISPLAY_DATE_FORMAT = 'DD MMM YYYY'
export const DISPLAY_DATETIME_FORMAT = 'DD MMM YYYY, HH:mm'

export const CURRENCIES = ['SAR', 'USD', 'EUR', 'GBP', 'AED'] as const
export const DEFAULT_CURRENCY = 'SAR'

export const ROLES = [
  'admin',
  'hr',
  'employee',
  'manager',
  'accountant',
  'inventory_manager',
  'maintenance_technician',
  'system_auditor',
  'td_officer',
] as const

export const LEAVE_TYPES = [
  { label: 'Annual Leave', value: 'annual' },
  { label: 'Sick Leave', value: 'sick' },
  { label: 'Unpaid Leave', value: 'unpaid' },
  { label: 'Maternity Leave', value: 'maternity' },
  { label: 'Paternity Leave', value: 'paternity' },
  { label: 'Other', value: 'other' },
] as const

export const WORK_ORDER_PRIORITIES = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
  { label: 'Critical', value: 'critical' },
] as const
