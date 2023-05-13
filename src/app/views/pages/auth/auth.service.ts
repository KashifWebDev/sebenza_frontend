import {Injectable} from '@angular/core';
import {accountType, ApiResponse, AuthResponse, Package, User} from "../../../core/interfaces/interfaces";
import {Observable, Subject} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserRole} from "../../../core/roles/UserRole";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: User | any = null;
  private authToken: string = '';
  loginStatusSubject: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient, private router: Router) {
    if(this.isLoggedIn()){
      // this.currentUser = JSON.parse(localStorage.getItem('userData') ?? '');
      this.authToken = localStorage.getItem('token') ?? '';
    }
  }

  setSession(token: any, user: User | undefined){
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    // this.loginStatusSubject.next(this.getLoggedInUser());
  }

  getLoggedInUser(): User | null {
    let user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }



  getToken(){
    return localStorage.getItem('token') ?? '';
  }

  logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('user');
    return true;
  }

  isLoggedIn(){
    return localStorage.getItem('token') !== null;
  }

  login(email: string, password: string): Observable<ApiResponse<AuthResponse>>{
    return this.http.post<ApiResponse<any>>(environment.backendURI+'/login',
      {email, password}
    );
  }

  register(formBody: FormData): Observable<ApiResponse<AuthResponse>>{
    return this.http.post<any>(environment.backendURI+'/register',
      formBody
    );
  }

  getAccTypes(): Observable<ApiResponse<{accounttypes: accountType[]}>>{
    return this.http.get<any>(environment.backendURI+'/gettypes');
  }

  getPackagesType(): Observable<ApiResponse<{accountpackages: Package[]}>>{
    return this.http.get<any>(environment.backendURI+'/getpackages');
  }

  getUserRole(){
    return UserRole.Admin;
  }

  redirectToDashboard(){
    let path = '';
    switch (this.getUserRole()){
      case UserRole.Admin:
        path = '/administrator';
        break;
      case UserRole.User:
        path = '/user';
        break;
      default:
        console.log("No roles were found to redirect the user to dashboard!");
        path = '/error/500';
    }
    console.log(path);

    this.router.navigate([path]);
  }
}
