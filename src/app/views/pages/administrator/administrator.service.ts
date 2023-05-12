import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiResponse, role, rolePermission, User} from "../../../core/interfaces/interfaces";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {

  constructor(private http: HttpClient) { }

  getAllRoles(): Observable<ApiResponse<{roles: role[]}>>{
    return this.http.get<ApiResponse<{ roles: role[] }>>(environment.backendURI+'/admin/userroles');
  }

  fetchUserDetail(id: number): Observable<ApiResponse<{user: User[]}>>{
    return this.http.get<ApiResponse<{ user: User[] }>>(
      environment.backendURI+`/user/details/${id}`
    );
  }

  getAllUsers(): Observable<ApiResponse<{users: User[]}>>{
    return this.http.get<ApiResponse<{ users: User[] }>>(
      environment.backendURI+'/admin/users'
    );
  }

  addNewRoleSubmit(formData: FormData): Observable<ApiResponse<{ role: role }>>{
    return this.http.post<ApiResponse<{role: role}>>(
      environment.backendURI+'/admin/userroles',
      formData
    );
  }

  addNewUserSubmit(formData: FormData): Observable<ApiResponse<{ user: User }>>{
    return this.http.post<ApiResponse<{user: User}>>(
      environment.backendURI+'/admin/users',
      formData
    );
  }

  editUserSubmit(formData: FormData): Observable<ApiResponse<{ user: User }>>{
    return this.http.post<ApiResponse<{user: User}>>(
      environment.backendURI+'/admin/users/update',
      formData
    );
  }
}
