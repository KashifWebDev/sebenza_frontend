import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "../../views/pages/auth/auth.service";

@Injectable()
export class HTTPReqInterceptor implements HttpInterceptor {

  private token: string = '';
  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.token = this.authService.getToken();

    return next.handle(
      request.clone({
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.token}`,
          'Accept': 'application/json'
        })
      })
    );
  }
}
