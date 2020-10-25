import { HttpService } from '../base/base.http.service';
import { AuthConstant } from './auth.constant';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { AuthorityModel } from '../../model/master-data/authority.model';
import { UserModel } from '../../model/master-data/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authorities: string[];
  stkCabinetList: any[];
  jwtHelper: JwtHelperService = new JwtHelperService();
  isAdmin = 0;
  rememberMe : boolean;

  constructor(private router: Router, private httpService: HttpService) {}

  login(userAuth: UserModel) {
    let headers = this.httpService.headers;
    return this.httpService.postRequest(
      AuthConstant.LOGIN_URL,
      JSON.stringify(userAuth),
      { headers: headers }
    );
  }

  saveToke(loginObject: any, rememberMe: boolean) {
    if (loginObject && !this.jwtHelper.isTokenExpired(loginObject.token)) {
      sessionStorage.setItem(AuthConstant.AUTHORIZATION, loginObject.token);
      sessionStorage.setItem(AuthConstant.USER_ID, loginObject.userName);
      this.authorities = [];
      this.stkCabinetList = [];
      loginObject.authorities.forEach((element) => {
        this.authorities.push(element.authority);
      });
      // loginObject.stkCabinetList.forEach(element => {
      //   this.stkCabinetList.push(element.cabinetno)
      // });
      sessionStorage.setItem('authorities', JSON.stringify(this.authorities));
      sessionStorage.setItem(AuthConstant.NAME, loginObject.fullName);
      sessionStorage.setItem(AuthConstant.USER_CABINETS, JSON.stringify(loginObject.stkCabinetList));
      if (rememberMe) {
        localStorage.setItem(AuthConstant.AUTHORIZATION, loginObject.token);
        localStorage.setItem(AuthConstant.USER_ID, loginObject.userName);
        localStorage.setItem('authorities', JSON.stringify(this.authorities));
        localStorage.setItem(AuthConstant.NAME, loginObject.fullName);
        localStorage.setItem(AuthConstant.USER_CABINETS, JSON.stringify(loginObject.stkCabinetList));
      }

      this.rememberMe = rememberMe;
      this.router.navigate([AuthConstant.SELECT_CABINET]);
      // this.router.navigate([AuthConstant.HOME]);
    }
  }

  setCurrentUserCabinet(userCabinet: any){
    sessionStorage.setItem(AuthConstant.SELECTED_CABINET, userCabinet);
    if (this.rememberMe) {
      localStorage.setItem(AuthConstant.SELECTED_CABINET, userCabinet);
    }
  }

  getCurrentUserCabinet(){
    let cabinet = sessionStorage.getItem(AuthConstant.SELECTED_CABINET);
    if (!cabinet || cabinet === 'undefined') {
       cabinet = localStorage.getItem(AuthConstant.SELECTED_CABINET);
    }

    return cabinet;
  }


  getCurrentUserCabinets() {
    let cabinetList: string;
    this.stkCabinetList = [];
    cabinetList = sessionStorage.getItem(AuthConstant.USER_CABINETS);
    if (cabinetList && cabinetList !== '') {
      return JSON.parse(cabinetList);
    } else {
      cabinetList = localStorage.getItem(AuthConstant.USER_CABINETS);
      if (cabinetList && cabinetList !== '') {
        return  JSON.parse(cabinetList);
      }
    }
  }

  getfullName() {
    let fullName = sessionStorage.getItem(AuthConstant.NAME);
    if (!fullName || fullName === 'undefined') {
      fullName = localStorage.getItem(AuthConstant.NAME);
    }
    return fullName;
  }

  getCurrentUsername() {
    let username = sessionStorage.getItem(AuthConstant.USER_ID);
    if (!username || username === 'undefined') {
      username = localStorage.getItem(AuthConstant.USER_ID);
    }
    return username;
  }

  reloadAuthorities() {
    let authoritiesListSt: string;
    this.authorities = [];
    authoritiesListSt = sessionStorage.getItem('authorities');
    if (authoritiesListSt && authoritiesListSt !== '') {
      this.authorities = JSON.parse(authoritiesListSt);
    } else {
      authoritiesListSt = localStorage.getItem('authorities');
      if (authoritiesListSt && authoritiesListSt !== '') {
        this.authorities = JSON.parse(authoritiesListSt);
      }
    }
  }

  isAuthenticated() {
    let token;
    if (localStorage.getItem(AuthConstant.AUTHORIZATION)) {
      token = localStorage.getItem(AuthConstant.AUTHORIZATION);
    } else {
      token = sessionStorage.getItem(AuthConstant.AUTHORIZATION);
    }

    if (token !== null && token !== undefined && token !== 'undefined') {
      this.isAdmin = this.jwtHelper.decodeToken(token).isadmin;
      return !this.jwtHelper.isTokenExpired(token);
    } else {
      return false;
    }
  }

  logoutAction() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  logout() {
    let requestHeaders;
    requestHeaders = this.httpService.headers;
    return this.httpService.deleteRequest(
      AuthConstant.LOGOUT_URL,
      requestHeaders
    );
  }
}
