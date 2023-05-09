import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiResponse, role} from "../../../core/interfaces/interfaces";
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
}
