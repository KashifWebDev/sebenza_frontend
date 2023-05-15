import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiResponse, Package, role, rolePermission, User} from "../../../core/interfaces/interfaces";
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

  fetchUserDetail(id: number): Observable<ApiResponse<{user: User}>>{
    return this.http.get<ApiResponse<{ user: User }>>(
      environment.backendURI+`/user/details/${id}`
    );
  }

  fetchRoleDetail(id: number): Observable<ApiResponse<{role: role}>>{
    return this.http.get<ApiResponse<{ role: role }>>(
      environment.backendURI+`/admin/userroles/${id}/edit`
    );
  }

  fetchPkgDetail(id: number): Observable<ApiResponse<{package: Package}>>{
    return this.http.get<ApiResponse<{ package: Package }>>(
      environment.backendURI+`/${id}`
    );
  }

  getAllPkgs(): Observable<ApiResponse<{accountpackages: Package[]}>>{
    return this.http.get<ApiResponse<{ accountpackages: Package[]}>>(
      environment.backendURI+`/admin/accountpackages`
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

  addNewPkgSubmit(formData: FormData): Observable<ApiResponse<{ accountpackage: Package }>>{
    return this.http.post<ApiResponse<{accountpackage: Package}>>(
      environment.backendURI+'/admin/accountpackages',
      formData
    );
  }

  editRoleSubmit(formData: FormData, id: number): Observable<ApiResponse<{ role: role }>>{
    return this.http.post<ApiResponse<{role: role}>>(
      environment.backendURI+`/admin/userrole/update/${id}`,
      formData
    );
  }

  addNewUserSubmit(formData: FormData): Observable<ApiResponse<{ user: User }>>{
    return this.http.post<ApiResponse<{user: User}>>(
      environment.backendURI+'/admin/users',
      formData
    );
  }

  editUserSubmit(formData: FormData, id: number): Observable<ApiResponse<{ user: User }>>{
    return this.http.post<ApiResponse<{user: User}>>(
      environment.backendURI+'/admin/user/update/'+id,
      formData
    );
  }

  deleteUserSubmit(id: number): Observable<ApiResponse<{ user: User }>>{
    return this.http.delete<ApiResponse<{user: User}>>(
      environment.backendURI+`/admin/users/${id}`
    );
  }

  deleteRoleSubmit(id: number): Observable<ApiResponse<{ role: role }>>{
    return this.http.delete<ApiResponse<{role: role}>>(
      environment.backendURI+`/admin/userroles/${id}`
    );
  }

  deletePkgSubmit(id: number): Observable<ApiResponse<{ accountpackage: Package }>>{
    return this.http.delete<ApiResponse<{accountpackage: Package}>>(
      environment.backendURI+`/admin/accountpackages/${id}`
    );
  }
}
