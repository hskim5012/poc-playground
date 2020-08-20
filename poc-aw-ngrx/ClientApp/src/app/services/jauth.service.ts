import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class JauthService {
  sessionId: string;
  jwt: string;
  isAuth: boolean;
  userRole: string;
  jwtPayload: any;
  jwtHelper: JwtHelperService;

  constructor() {
    this.isAuth = false;
    this.jwtHelper = new JwtHelperService();
    this.userRole = 'AE'; //default to non-admin user role
  }

  public getSessionId() {
    return this.sessionId;
  }

  public setJwt(_jwt: string) {
    this.invalidateCurrentJwt();
    this.jwt = _jwt;
    this.jwtPayload = this.jwtHelper.decodeToken(_jwt);
    localStorage.setItem('tokenExpires', JSON.stringify(this.jwtPayload.exp));
    if (this.jwtPayload && this.jwtPayload.user && this.jwtPayload.user.role) {
      this.userRole = this.jwtPayload.user.role;
    }
  }

  public getJwt(): string {
    return this.jwt;
  }

  public setSessionId(_session: string) {
    if (
      this.sessionId === null ||
      this.sessionId === undefined ||
      this.sessionId === ''
    ) {
      this.sessionId = _session;
    }
  }

  public invalidateCurrentJwt() {
    window.localStorage.clear();
    this.isAuth = false;
    this.jwt = '';
  }

  public isExpiredJwt() {
    let tokenExpires = JSON.parse(localStorage.getItem('tokenExpires'));
    let d = new Date();
    let time = d.getTime();
    if (time > tokenExpires * 1000) {
      return true;
    }

    return false;
  }

  public getUserRole() {
    return this.userRole;
  }
}
