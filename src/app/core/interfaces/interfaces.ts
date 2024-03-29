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
  membership_code?: string,
  member_by?: string,
  account_type: string,
  account_type_id: number,
  country: string,
  city: string,
  address: string,
  user_limit: string,
  user_limit_id: number,
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

export interface expense{
  id: number,
  membership_id: number,
  expensetype_id: number,
  amount: number,
  notes: string,
  image: string,
  created_at: string,
  updated_at: string,
  expensetypes: expenseType
}

export interface order {
  id: number;
  user_id: number;
  membership_id: string;
  account_total_user: number;
  new_user: number;
  cost_per_user: string;
  amount_total: string;
  orderDate: string;
  expireDate: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  users: {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    profile: string,
    company_name: string,
    membership_code?: string,
    member_by?: string,
    account_type: string,
    account_type_id: number,
    country: string,
    city: string,
    address: string,
    user_limit: string,
    user_limit_id: number,
    roles: role[]
  };
}

export interface invoice {
  id: number,
  invoiceID: string,
  order_id: number,
  account_total_user: number,
  cost_per_user: string,
  amount_total: string,
  discount: string,
  payable_amount: string,
  paid_amount: string,
  payment_id: string,
  payment_type: string,
  invoiceDate: string,
  paymentDate: string,
  status: string,
  created_at: string,
  updated_at: string,
  orders: order,
  email_sent : boolean,
  invoice_type: string
}

export interface userProfile {
  first_name: string,
  last_name: string,
  phone: string,
  address: string,
  postcode: string,
  state: string,
  country: string,
  city: string,
  profile: string
}

export interface payFrequency {
  id: number,
  user_id: number,
  membership_id: string,
  frequecy_name: string,
  status: string,
  updated_at: string,
  created_at: string,
}

export interface salary{
  id: number,
  created_by: number,
  user_id: number,
  payment_frequency_id: number,
  "payment_frequency": string,
  "membership_id": string,
  "basic_salaray": string,
  "hourly_rate": string,
  "working_hour": string,
  "account_balance": string,
  "pending_withdrew": string,
  "withdrew_balance": string,
  "status": string,
  "created_at": string,
  "updated_at": string,
  full_name: string
}

export interface withdraw{
  id: number,
  user_id: number,
  membership_id: string,
  payment_method: string,
  account_number: string,
  amount: string,
  status: string,
  full_name?: string,
  created_at: string,
  updated_at: string
}

export interface vat{
  id: number,
  user_id: number,
  membership_id: string,
  vat: string,
  tax: string,
  created_at: string,
  updated_at: string
}

export interface bank{
  id: number,
  user_id: number,
  membership_id: string,
  account_name: string,
  payment_method: string,
  account_number: string,
  additional_info: string,
  status: string,
  created_at: string,
  updated_at: string
}

export interface termsCondition{
  id: number
  user_id: number,
  category_id: number,
  termscondition: string,
  membership_code: string,
  status: string,
  updated_at: string,
  created_at: string,
}

export interface termsConditionCategory{
  user_id: number,
  category_name: string,
  membership_code: string,
  status: string,
  updated_at: string,
  created_at: string,
  id: number
}
export  interface product{
  id: number,
  user_id: number,
  membership_code: string,
  ProductName: string,
  ProductImage: string,
  BrandName: string,
  status: number,
  created_at: string,
  updated_at: string
}
export  interface asset{
  id: number,
  user_id: number,
  membership_code: string,
  asset_name: string,
  asset_description: string,
  quantity: number,
  purchese_date: string,
  purchese_value: number,
  currency: string,
  capture_date: string,
  capture_name: string,
  attachment: string,
  created_at: string,
  updated_at: string
}
export interface warehouse {
  id: number,
  user_id: number,
  membership_code: string,
  title: string,
  country: string,
  city: string,
  location: string,
  total_qty: number,
  total_transfer: number,
  available_qty: number,
  status: number,
  created_at: string,
  updated_at: string
}
export interface customer {
  id: number,
  user_id: number,
  membership_code: string,
  name: string,
  email: string,
  password: string,
  company_name: string,
  status: number,
  created_at: string,
  updated_at: string
}
export interface file {
  id: number,
  user_id: number,
  membership_code: string,
  title: string,
  text: string,
  file: string,
  created_at: string,
  updated_at: string
}
