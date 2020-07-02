import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Rx';
import { AuthConstant } from './auth.constant';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let jwtkey, headers, body;
    jwtkey = this.getToken(request.url);
    if (jwtkey !== null && jwtkey !== undefined && jwtkey !== 'undefined' && jwtkey) {
      headers = request.headers;
      body = request.body;
      const jwtkeyType = typeof jwtkey;
      if (jwtkeyType === 'string') {
        headers = headers.set(AuthConstant.AUTHORIZATION, jwtkey);
        request = request.clone({
          headers: headers,
          body: body
        });
      } else {
        request = request.clone({
          body: body
        });
      }
      return next.handle(request);
    } else {
      this.auth.logoutAction();
    }
  }

  getToken(requestedURL: string) {
    let jwtkey;
    if (requestedURL.includes(AuthConstant.LOGIN_URL)) {
      return true;
    }
    if (localStorage.getItem(AuthConstant.AUTHORIZATION)) {
      jwtkey = localStorage.getItem(AuthConstant.AUTHORIZATION);
    } else {
      jwtkey = sessionStorage.getItem(AuthConstant.AUTHORIZATION);
    }
    if (jwtkey === null || jwtkey === undefined || jwtkey === 'undefined') {
      if (this.auth.isAuthenticated()) {
        return jwtkey;
      } else {
        return null;
      }
    } else {
      return jwtkey;
    }
  }
}
