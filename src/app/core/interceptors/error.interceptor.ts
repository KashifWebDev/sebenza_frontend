import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import {catchError, Observable, tap, throwError} from 'rxjs';
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {AppService} from "../../app.service";
import {AuthService} from "../../views/pages/auth/auth.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private service: AppService,
              private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(event => {
        if(event instanceof HttpResponse){
          if(request){

          }
        }
      }),
      catchError(error => {
        console.log('TEST: '+error.status);
          if(error.status == 0){
            this.authService.loginStatusSubject.next({ success: false,
              title: 'Backend Down',
              text: 'Our apologies, the system is currently undergoing maintenance. Please try again later.'
            });
          }

          if(error.status == 401){
            this.authService.loginStatusSubject.next({ success: false,
              title: 'Backend Down',
              text: 'Our apologies, the system is currently undergoing maintenance. Please try again later.'
            });
          }
        return throwError(error);
      })
    )
  }
}
