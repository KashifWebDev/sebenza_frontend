import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {loginRequest, loginResponse, User} from "./dataTypes.interface";
import {environment} from "../environments/environment";
import Swal from "sweetalert2";

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
