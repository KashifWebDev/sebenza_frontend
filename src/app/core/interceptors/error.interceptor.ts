import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import {catchError, Observable, tap, throwError} from 'rxjs';
import {Router} from "@angular/router";
import {AuthService} from "../../views/pages/auth/auth.service";
import {AppService} from "../../app.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private authService: AuthService, private appService: AppService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(event => {
        if(event instanceof HttpResponse){
          if(request){

          }
        }
      }),
      catchError(error => {
        if(error.error.message == 'Unauthenticated.'){
          this.appService.swalFire('Please login again to continue session!', 'warning', 3000);
          this.authService.logout();
          this.router.navigate(['/']);
        }
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
