export interface Course {
  id: string
  title: string
  description?: string
  category?: string
  duration?: string
  duration_hours?: number
  thumbnail?: string
  instructor?: string
  format: 'online' | 'in_person' | 'blended'
  status: 'draft' | 'published' | 'archived'
  max_enrollments?: number
  created_by: string
  created_at: string
}

export interface Enrollment {
  id: string
  employee_id: string
  course_id: string
  status: 'enrolled' | 'in_progress' | 'completed' | 'dropped'
  progress: number
  enrolled_at: string
  completed_at?: string
  score?: number
  certificate_id?: string
}

export interface Certification {
  id: string
  employee_id: string
  course_id?: string
  name: string
  issuer?: string
  issued_date: string
  expiry_date?: string
  certificate_url?: string
  is_verified: boolean
}

export interface TrainingPlan {
  id: string
  employee_id: string
  year: number
  goals?: string
  budget?: number
  status: 'draft' | 'approved' | 'in_progress' | 'completed'
  courses?: string[]
  created_at: string
}

export interface SkillAssessment {
  id: string
  employee_id: string
  skill: string
  level: 1 | 2 | 3 | 4 | 5
  assessed_by?: string
  assessed_at: string
  notes?: string
}
