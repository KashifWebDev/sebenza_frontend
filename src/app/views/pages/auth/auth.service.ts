import {Injectable} from '@angular/core';
import {accountType, adminUser, ApiResponse, AuthResponse, Package, User} from "../../../core/interfaces/interfaces";
import {Observable, Subject} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserRole} from "../../../core/roles/UserRole";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: User | adminUser;
  public userType: UserRole;
  $currentUser: Subject<User | adminUser> = new Subject<User | adminUser>();
  private authToken: string = '';
  errSubject: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient, private router: Router) {
    if(this.isLoggedIn()){
      const storedUserType = localStorage.getItem('userType');
      let userType: UserRole;
      if (storedUserType && Object.values(UserRole).includes(storedUserType as UserRole)) {
        userType = storedUserType as UserRole;
      } else {
        this.logout();
        userType = UserRole.User; // Default value if userType is not found or invalid
      }

      this.userType = userType;

      // this.currentUser =JSON.parse(localStorage.getItem('userData')) | [];
      this.authToken = localStorage.getItem('token') ?? '';
      const userData = localStorage.getItem('userData');
      if (userData !== null) {
        this.currentUser = JSON.parse(userData);
      }
    }
  }

  setSession(token: any, user: User | adminUser){
    this.currentUser = user;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('userType', this.userType);
    this.$currentUser.next(this.currentUser);
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
    localStorage.removeItem('userType');
    return true;
  }

  isLoggedIn(){
    return localStorage.getItem('token') !== null;
  }

  login(email: string, password: string, userType: UserRole): Observable<ApiResponse<{ token: string, user: User | adminUser }>>{
    if(userType == 'user'){
      return this.http.post<ApiResponse<any>>(environment.backendURI+'/login',
        {email, password}
      );
    }
    else{
      return this.http.post<ApiResponse<any>>(environment.backendURI+'/admin/login',
        {email, password}
      );
    }
  }

  register(formBody: FormData): Observable<ApiResponse<{token: string, user: User}>>{
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
    return this.userType;
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
        console.error("No roles were found to redirect the user to dashboard!");
        path = '/error/500';
    }
    console.log(path);

    this.router.navigate([path]);
  }
}
