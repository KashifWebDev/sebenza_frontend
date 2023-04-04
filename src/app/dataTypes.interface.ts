export interface loginRequest{
  email: string,
  password: string
}
export interface loginResponse{
  success: boolean,
  token?: string,
  user?: User,
  message?: string,
  data?: any
  status?: any
}
export interface User {
  id: string,
  name: string,
  email: string
}
export interface Project{
  id?: number,
  title: string,
  about: string,
  client: string,
  slug?: string,
  url: string,
  tags: string[],
  start_date: string,
  pictures?: string[],

}
