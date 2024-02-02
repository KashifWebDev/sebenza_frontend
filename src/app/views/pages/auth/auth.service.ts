import {Injectable} from '@angular/core';
import {
  accountType,
  adminUser,
  ApiResponse,
  Package,
  role,
  User,
  userProfile
} from "../../../core/interfaces/interfaces";
import {Observable, Subject} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserRole} from "../../../core/roles/UserRole";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: User;
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
      const userData = localStorage.getItem('user');
      if (userData) {
        this.currentUser = JSON.parse(userData);
      }
    }
  }

  setSession(token: any, user: User){
    this.currentUser = user;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('userType', this.userType);
    this.$currentUser.next(this.currentUser);
  }

  userDataUpdated(user: userProfile){
    let newData: User | any = {
      ...this.getLoggedInUser(),
      first_name: user.first_name,
      last_name: user.last_name,
      profile : user.profile,
    };

    localStorage.setItem(
      'user',
      JSON.stringify(newData)
    );
    this.$currentUser.next(newData);
  }

  getLoggedInUser(): User | null {
    let user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getToken(){
    return localStorage.getItem('token') ?? '';
  }

  logout(){
    var path = '/logout'
    if(this.userType == UserRole.superAdmin) path = '/admin/logout';
    const formData = new FormData();
    formData.append('token', this.getToken());
    this.http.post<ApiResponse<any>>(
      environment.backendURI+path,
      formData
    ).subscribe(data => {
    });
    localStorage.removeItem('token')
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
    return true;
  }

  isLoggedIn(){
    return localStorage.getItem('token') !== null;
  }

  login(email: string, password: string, userType: UserRole): Observable<ApiResponse<{ token: string, user: User }>>{
    if(userType == UserRole.superAdmin){
      return this.http.post<ApiResponse<any>>(environment.backendURI+'/admin/login',
        {email, password}
      );
    }
    else{
      return this.http.post<ApiResponse<any>>(environment.backendURI+'/login',
        {email, password}
      );
    }
  }

  register(formBody: FormData): Observable<ApiResponse<{token: string, user: User}>>{
    return this.http.post<any>(environment.backendURI+'/register',
      formBody
    );
  }

  invite(formBody: FormData): Observable<ApiResponse<any>>{
    return this.http.post<any>(environment.backendURI+'/update/new-member',
      formBody
    );
  }

  getAccTypes(): Observable<ApiResponse<{accounttypes: accountType[]}>>{
    return this.http.get<any>(environment.backendURI+'/gettypes');
  }

  getPackagesType(): Observable<ApiResponse<{accountpackages: Package[]}>>{
    return this.http.get<any>(environment.backendURI+'/getpackages');
  }

  getUserRole(): UserRole | null{
    const userData = this.getLoggedInUser();
    if(userData){
      const userRole: role = userData.roles[userData.roles.length - 1];
      return userRole.name;
    }
    return  null;
  }

  redirectToDashboard(){
    let path = '';
    switch (this.getUserRole()){
      case UserRole.superAdmin:
        path = '/administrator';
        break;
      case UserRole.User:
      case UserRole.superUser:
      case UserRole.HR:
      default:
        path = '/user';
        break;
      // default:
      //   console.error("No roles were found to redirect the user to dashboard!");
      //   path = '/error/500';
    }
    this.router.navigate([path]);
  }
}
