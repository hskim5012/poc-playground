import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { JauthService } from '../services/jauth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  jwt: string;
  constructor(private authenticationService: JauthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    // let currentUser = this.authenticationService.currentUserValue;
    this.jwt = this.authenticationService.getJwt();
    if (this.jwt) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.jwt}`
        }
      });
    }
    return next.handle(request);
  }

  public getToken() {
    return this.jwt;
  }
}
