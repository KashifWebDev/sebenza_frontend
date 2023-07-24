import {UserRole} from "../roles/UserRole";

export interface ApiResponse<T> {
  status: boolean;
  message?: string;
  data?: T;
}

export interface ApiError {
  status: number;
  message: string;
}

export interface role {
  id: number,
  name: UserRole,
  guard_name: string,
  permissions: rolePermission[]
}

export interface rolePermission {
  id: number,
  name: string,
  guard_name: string,
  group_name: string
}

export interface User {
  id: number,
  first_name: string,
  last_name: string,
  email: string,
  phone: string,
  profile: string,
  company_name: string,
  account_type_id: number,
  country: string,
  city: string,
  address: string,
  user_limit_id: string,
  roles: role[]
}

export interface adminUser {
  id: number,
  first_name: string,
  last_name: string,
  email: string,
  phone: string,
  email_verified_at: string,
  status: string,
  roles: role[]
}

export interface AuthResponse {
  user: User,
  token: string
}

export interface accountType {
  id: number,
  account_type: string,
  status: string,
  created_at: string,
  updated_at: string
}

export interface Package {
  id: number,
  account_package: string,
  max_user?: number,
  status?: string,
  created_at?: string,
  updated_at?: string
}

export interface News {
  id: number,
  title: string,
  slug: string,
  description: string,
  seen: boolean,
  postImage: string,
  status: string,
  total_view: number,
  created_at?: string,
  updated_at?: string
}

export interface basicSettings {
  id: number,
  contact: string,
  email: string,
  logo: string,
  address: string,
  title: string,
  site_name: string,
  meta_description: string,
  meta_keyword: string,
  facebook_pixel: string,
  google_analytics: string,
  facebook: string,
  instagram: string,
  tiktok: string,
  pinterest: string,
  twitter: string,
  google: string,
  rss: string,
  linkedin: string,
  youtube: string,
  created_at: string,
  updated_at: string
}

export interface WhatsApp {
  id: number,
  user_name: string,
  whatsapp_number: string,
  status: string,
  created_at: string,
  updated_at: string
}

export interface Ticket {
  id: number,
  from_id: number,
  name: string,
  email: string,
  subject: string,
  department: string,
  priority: string,
  message: string,
  attachment: string,
  status: string,
  solved_By: number,
  created_at: string,
  updated_at: string,
  users?: User
}

export interface ticketReplies {
  id: number,
  ticket_id: number,
  replay: string,
  replayatt: string,
  status: 'Customer-Replay' | 'Answered',
  type: string,
  from_user_id: number,
  created_at: string,
  updated_at: string,
  users: User | null
}

export interface promoCode {
  id: number,
  title: string,
  promocode: string,
  expired_date: string,
  discount_percent: string,
  status: string,
  created_at: string,
  updated_at: string,
}
export interface Meeting{
  id: number,
  form_id: number,
  title: string,
  place: string,
  description: string,
  date: string,
  time: string,
  status: string,
  link: string,
  recipients: any,
  created_at: string,
  updated_at: string
}

export interface Task{
  id: number,
  form_id: number,
  name: string,
  details: string,
  date: string,
  time: string,
  status: string,
  created_at: string,
  updated_at: string
}

export interface Task{
  id: number,
  form_id: number,
  name: string,
  details: string,
  date: string,
  time: string,
  status: string,
  created_at: string,
  updated_at: string,
  tasknotes: taskNote[]
}

export interface taskNote {
  id: number,
  task_id: number,
  description: string,
  created_at: string,
  updated_at: string
}

export interface Calender{
  id: number,
  form_id: number,
  title: string,
  details: string,
  bgColor: string,
  startDate: string,
  startTime: string,
  endDate: string,
  endTime: string,
  created_at: string,
  updated_at: string
}

export interface expenseType{
  id: number,
  membership_id: number,
  expence_type: string,
  created_at: string,
  updated_at: string
}
