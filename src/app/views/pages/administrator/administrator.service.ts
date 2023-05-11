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

  getAllPermissions(): Observable<ApiResponse<{permissions: rolePermission[]}>>{
    return this.http.get<ApiResponse<{ permissions: rolePermission[] }>>(
      environment.backendURI+'/admin/getpermissions'
    );
  }

  getAllUsers(): Observable<ApiResponse<{users: User[]}>>{
    return this.http.get<ApiResponse<{ users: User[] }>>(
      environment.backendURI+'/admin/users'
    );
  }

  reformatPermissionText(permission: string){
    return  permission.replace(/(\b[a-z](?!\b)|\G)[a-z]*\b\.?/gi, (word) => {
      if (word.endsWith('.')) {
        word = word.substring(0, word.length - 1) + ' > ';
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
  }

  reversePermissionText(permission: string) {
    return  permission
      .split(' > ')
      .map((word) => {
        if (word.endsWith('.')) {
          word = word.slice(0, -1);
        }
        return word.charAt(0).toLowerCase() + word.slice(1);
      })
      .join('.');
  }

  addNewRoleSubmit(formData: FormData): Observable<ApiResponse<{ role: role }>>{
    return this.http.post<ApiResponse<{role: role}>>(
      environment.backendURI+'/admin/userroles',
      formData
    );
  }
}
