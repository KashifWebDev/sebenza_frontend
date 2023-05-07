import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loginStatusSubject  = new Subject<any>();

  constructor(private http: HttpClient) { }


  // login(credentials: loginRequest): Observable<loginResponse>{
  //   return this.http.post<loginResponse>(environment.backendURI+'/auth/login',
  //     credentials
  //   );
  // }
}
