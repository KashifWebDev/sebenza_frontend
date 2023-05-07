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
import {AuthService} from "../../views/pages/auth/auth.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private service: AuthService) {}

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
          if(error.status == 401){
            Swal.fire({
              title: 'Login Session Expired.',
              text: 'Please login again to resume your session!',
              icon: 'error'
            }).then(() => {
              this.service.logout();
              this.router.navigate(['/']);
            });
          }
        return throwError(error);
      })
    )
  }
}
