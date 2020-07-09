import {Injectable} from '@angular/core';
import {HttpService} from './base.http.service';
import {HttpClient} from '@angular/common/http';
import {SearchParPojo} from 'app/shared/model/searching-pojos/search.par.pojo.model';
import {BaseConstants} from './base.constants';
import {OnePagerConstant} from "../one-pager/one-pager-constant";

@Injectable()
export class BaseHttpCrudService extends HttpService {

  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  findAll(serviceUrl: string) {
    let headers, body;
    serviceUrl += BaseConstants.FIND_ALL;
    headers = this.headers;
    body = {};
    return super.postRequest(serviceUrl, body, {headers: headers});
  }

  findById(serviceUrl: string, id: number) {
    let requestHeaders, url;
    url = serviceUrl + BaseConstants.FIND_BY_ID + '/' + id;
    requestHeaders = this.headers;
    return super.getRequest(url, requestHeaders);
  }

  findPageWithSearchPojo(serviceUrl: string, searchingObject: SearchParPojo) {
    let requestHeaders, body, url;
    url = serviceUrl + BaseConstants.FIND_LIST_PAGE_SPECIFICATION;
    requestHeaders = this.headers;
    if (searchingObject.size === 0) {
      searchingObject.size = 5;
    }
    body = searchingObject;
    return super.postRequest(url, body, {headers: requestHeaders});
  }

  findWithSearchPojo(serviceUrl: string, searchingObject: SearchParPojo) {
    let requestHeaders, body, url;
    url = serviceUrl + BaseConstants.FIND_LIST_SPECIFICATION;
    requestHeaders = this.headers;
    if (searchingObject.size === 0) {
      searchingObject.size = 5;
    }
    body = searchingObject;
    return super.postRequest(url, body, {headers: requestHeaders});
  }

  deleteItem(serviceUrl: string, itemId) {
    let requestHeaders, url;
    requestHeaders = this.headers;
    url = serviceUrl + BaseConstants.DELETE + '/' + itemId;
    return super.deleteRequest(url, requestHeaders);
  }

  saveItem(serviceUrl: string, item: any, isUpdateMode: boolean) {
    if (isUpdateMode) {
      return this.updateItem(serviceUrl, item);
    } else {
      return this.createItem(serviceUrl, item);
    }
  }

  private createItem(serviceUrl: string, item: any) {
    let requestHeaders, url;
    requestHeaders = this.headers;
    url = serviceUrl + BaseConstants.CREATE;
    return super.postRequest(url, item, {headers: requestHeaders});
  }

  private updateItem(serviceUrl: string, item: any) {
    let requestHeaders, url;
    requestHeaders = this.headers;
    url = serviceUrl + BaseConstants.EDIT + '/' + item.id;
    return super.putRequest(url, item, {headers: requestHeaders});
  }
}
