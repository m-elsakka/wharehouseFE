import {BaseConstants} from './base.constants';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {catchError, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

declare var appConfig: any;

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl: string;
  multipartHeaders = BaseConstants.HTTP_OPTIONS;
  headers = BaseConstants.HTTP_OPTIONS;
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) {
    if (appConfig['isLive']) {
      this.baseUrl = window.location.protocol + '//' + window.location.host + '/' + appConfig['context'] + '/';
    } else {
      this.baseUrl = appConfig['backendUrl'];
    }

    this.multipartHeaders = this.multipartHeaders
      .set('enctype', 'multipart/form-data')
      .set(BaseConstants.ACCEPT_KEY, BaseConstants.APPLICATION_JSON);

    this.headers = this.headers
      .set(BaseConstants.CONTENT_TYPE_KEY, BaseConstants.APPLICATION_JSON)
      .set(BaseConstants.ACCEPT_KEY, BaseConstants.APPLICATION_JSON)
    ;
  }

  getRequest(methodUrl: string, options: any) {
    let url;
    url = this.baseUrl + methodUrl;
    options.responseType = 'text';
    return this.http.get(url, options).pipe(
      map((response: any) => {
        let responseBody;
        responseBody = this.jwtHelper.decodeToken(response);
        return responseBody.data;
      }), catchError((error: HttpErrorResponse) => {
        return throwError(error.message);
      }));
  }

  postRequest(serviceUrl: string, body: any, options: any) {
    let url;
    url = this.baseUrl + serviceUrl;
    options.responseType = 'text';
    return this.http.post(url, body, options).pipe(
      map((response: any) => {
        let responseBody;
        responseBody = this.jwtHelper.decodeToken(response);
        return responseBody.data;
      }), catchError((error: HttpErrorResponse) => {
        return throwError(error.message);
      }));
  }

  putRequest(serviceUrl: string, body: any, options: any) {
    let url;
    url = this.baseUrl + serviceUrl;
    options.responseType = 'text';
    return this.http.put(url, body, options).pipe(
      map((response: any) => {
        let responseBody;
        responseBody = this.jwtHelper.decodeToken(response);
        return responseBody.data;
      }), catchError((error: HttpErrorResponse) => {
        let responseBody;
        responseBody = this.jwtHelper.decodeToken(error.error);
        return throwError(responseBody);
      })
    );
  }

  deleteRequest(serviceUrl: string, options: any) {
    let url;
    url = this.baseUrl + serviceUrl;
    options.responseType = 'text';
    return this.http.delete(url, options)
      .pipe(
        map((response: any) => {
          let responseBody;
          responseBody = this.jwtHelper.decodeToken(response);
          return responseBody.data;
        }), catchError((error: HttpErrorResponse) => {
          return throwError(error.message);
        }))
      ;
  }

  downloadFile(serviceUrl: string): Observable<any> {
    let url;
    url = this.baseUrl + serviceUrl;
    return this.http.get(url, {responseType: 'blob', observe: 'response'})
      .pipe(
        map((response: HttpResponse<object>) => {
          let responseObj;
          responseObj = {
            data: response.body,
            fileName: response.headers.get('filename')
          };
          return responseObj;
        }), catchError((error: HttpErrorResponse) => {
          return throwError(error.message);
        }));
  }

  downloadFileWithSearchParam(serviceUrl: string, searchObj: any): Observable<any> {
    let url;
    url = this.baseUrl + serviceUrl;
    return this.http.post(url, searchObj, {responseType: 'blob', observe: 'response'})
      .pipe(
        map((response: HttpResponse<object>) => {
          let responseObj;
          responseObj = {
            data: response.body,
            fileName: response.headers.get('filename')
          };
          return responseObj;
        }), catchError((error: HttpErrorResponse) => {
          return throwError(error.message);
        }));
  }

}
