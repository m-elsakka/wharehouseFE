import {Injectable} from '@angular/core';
import {ClaimsConstant} from './Claims.constant';
import {BaseConstants} from '../base/base.constants';
import {BaseHttpCrudService} from "../base/base-http-crud.service";
import {HttpClient} from "@angular/common/http";
import { HttpParams } from "@angular/common/http";


@Injectable()
export class ClaimsService extends BaseHttpCrudService {

  constructor(private httpSurveyGroupSer: HttpClient) {
    super(httpSurveyGroupSer);
  }

  getAllDistributors() {
    console.log("testets");
    let headers, body;
    headers = this.headers;
    body = {};
    return super.getRequest(BaseConstants.DISTIBUTES_URL, {headers: headers});
  }


  generateAutoClaims(branchno:any,period:any,userId:string,claimType:string){
    let headers, url;
    headers = this.headers;
     let params = new HttpParams().set("period",period).set("userId", userId)
     .set("branchno",branchno).set("claimType",claimType); //Create new HttpParams


     console.log(period +"---"+userId+"---"+branchno+"---"+claimType);

    url = ClaimsConstant.GENERATE 
    return super.getRequest(url, {headers: headers,params: params});
  }

  saveClaims(claim: any , isUpdateMode: any) {
    if (isUpdateMode) {
      return this.updateClaims(claim);
    } else {
      return this.createCliams(claim);
    }
  }



  private createCliams(cliam: any) {
    let headers;
    headers = this.headers;
    return super.postRequest(ClaimsConstant.DIST_CREATE_URL, cliam, {headers: headers});
  }

  private updateClaims(claim: any) {
    let headers, url;
    headers = this.headers;
    url = ClaimsConstant.CLAIMS_UPDATE_URL;
    return super.putRequest(url, claim, {headers: headers});
  }

  checkAutoClaims(branchno:any,period:any,userId:string,claimType:string){
    let headers, url;
    headers = this.headers;
     let params = new HttpParams().set("period",period).set("userId", userId)
     .set("branchno",branchno).set("claimType",claimType); //Create new HttpParams
     console.log(period +"---"+userId+"---"+branchno+"---"+claimType);
    url = ClaimsConstant.CHECK 
    return super.getRequest(url, {headers: headers,params: params});
  }


  confirmAutoClaims(period:any,claimType:string){
    let headers, url;
    headers = this.headers;
     let params = new HttpParams().set("period",period).set("claimType",claimType); //Create new HttpParams
    url = ClaimsConstant.CONFIRM 
    return super.getRequest(url, {headers: headers,params: params});
  }

  loadAutoClaims(period:any){
    let headers, url;
    headers = this.headers;
     let params = new HttpParams().set("period",period); //Create new HttpParams
    url = ClaimsConstant.LOAD; 
    return super.getRequest(url, {headers: headers,params: params});
  }

  reportClaims(period:any){
    let headers, url;
    headers = this.headers;
     let params = new HttpParams().set("period",period); //Create new HttpParams
    url = ClaimsConstant.REPORT; 
    return super.getRequest(url, {headers: headers,params: params});
  }

  calcTotalClaims(branchno:string,period:any,claimType:string){
    let headers, url;
    headers = this.headers;
     let params = new HttpParams().set("period",period)
     .set("branchno",branchno).set("claimType",claimType);
    url = ClaimsConstant.CALC_TOTAL; 
    return super.getRequest(url, {headers: headers,params: params});
  }


  updateSelectedCummdist(brannch:any){
    let headers, url;
    headers = this.headers;
    url = ClaimsConstant.DISTIBUTES_URL  + BaseConstants.EDIT
    +'/cummDist/'+brannch;
    return super.putRequest(url, brannch, {headers: headers});
  }

}
