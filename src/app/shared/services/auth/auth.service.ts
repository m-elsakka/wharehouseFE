import {HttpService} from '../base/base.http.service';
import {AuthConstant} from './auth.constant';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {map} from 'rxjs/operators';
import {AuthorityModel} from '../../model/master-data/authority.model';
import { UserModel } from '../../model/master-data/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authorities: string[];
  jwtHelper: JwtHelperService = new JwtHelperService();
  isAdmin = 0;
  

  constructor(private router: Router, private httpService: HttpService) {
  }

  login(userAuth: UserModel) {
    let headers = this.httpService.headers;
    return this.httpService.postRequest(AuthConstant.LOGIN_URL, JSON.stringify(userAuth), {headers: headers});

  }

  saveToke(loginObject: any, rememberMe: boolean) {
    if (loginObject && !this.jwtHelper.isTokenExpired(loginObject.token)) {
      sessionStorage.setItem(AuthConstant.AUTHORIZATION, loginObject.token);
      sessionStorage.setItem(AuthConstant.USER_ID, loginObject.username);
      // this.authorities = [];
      // loginObject.authorities.forEach((element) => {
      //   this.authorities.push(element.authority);
      // });
      // sessionStorage.setItem('authorities', JSON.stringify(this.authorities));
      // sessionStorage.setItem(AuthConstant.NAME, loginObject.fullName);
      if (rememberMe) {
        localStorage.setItem(AuthConstant.AUTHORIZATION, loginObject.token);
        localStorage.setItem(AuthConstant.USER_ID, loginObject.username);
       // localStorage.setItem('authorities', JSON.stringify(this.authorities));
       // localStorage.setItem(AuthConstant.NAME, loginObject.fullName);
      }
    
      this.router.navigate([AuthConstant.HOME]);
    }
  }

  getfullName(){
   let fullName= sessionStorage.getItem(AuthConstant.USER_ID);
   if(!fullName || fullName === 'undefined'){
    fullName=localStorage.getItem(AuthConstant.NAME);
   }
   return fullName;
  }
  reloadAuthorities() {
    let authoritiesListSt: string;
    this.authorities = [];
    authoritiesListSt = sessionStorage.getItem('authorities');
    if (authoritiesListSt && authoritiesListSt !== '') {
      this.authorities = JSON.parse(authoritiesListSt);
    }
	else {
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

  logout(){
    let requestHeaders;
    requestHeaders = this.httpService.headers;
    return this.httpService.deleteRequest(AuthConstant.LOGOUT_URL,requestHeaders);
  }
}
