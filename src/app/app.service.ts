import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
import Swal from "sweetalert2";
import {accountType, ApiResponse, Package, signUpResponse, User} from "./core/interfaces/interfaces";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public currentUser: User | any = null;
  private authToken: string = '';

  constructor(private http: HttpClient) {
    if(this.isLoggedIn()){
      // this.currentUser = JSON.parse(localStorage.getItem('userData') ?? '');
      this.authToken = localStorage.getItem('token') ?? '';
    }
  }

  login(credentials: ApiResponse<any>): Observable<ApiResponse<User>>{
    return this.http.post<ApiResponse<any>>(environment.backendURI+'/auth/login',
      credentials
    );
  }

  register(formBody: FormData): Observable<ApiResponse<signUpResponse>>{
    return this.http.post<any>(environment.backendURI+'/register',
      formBody
    );
  }

  getAccTypes(): Observable<ApiResponse<accountType[]>>{
    return this.http.get<any>(environment.backendURI+'/gettypes');
  }

  getPackagesType(): Observable<ApiResponse<Package[]>>{
    return this.http.get<any>(environment.backendURI+'/getpackages');
  }

  setSession(token: string){
    localStorage.setItem('token', token);
  }

  getToken(){
    console.log(`TOKEN: ${localStorage.getItem('token')}`);
    return localStorage.getItem('token') ?? '';
  }

  logout(){
    return localStorage.removeItem('token');
  }

  isLoggedIn(){
    return localStorage.getItem('token') !== null;
  }
}
