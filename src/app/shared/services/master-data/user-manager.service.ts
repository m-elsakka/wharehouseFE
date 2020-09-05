import { Injectable } from '@angular/core';
import { BaseHttpCrudService } from '../base/base-http-crud.service';
import { HttpClient } from '@angular/common/http';
import { BaseConstants } from '../base/base.constants';

@Injectable()
export class UserManagerService extends BaseHttpCrudService {
  serviceUrl: string;

  constructor(private userManageHttpSer: HttpClient) {
    super(userManageHttpSer);
    this.serviceUrl = 'usermanagement/users/';
  }

  retrieveUserLevels() {
    const url = 'usermanagement/user-levels/';
    return super.findAll(url);
  }

  deleteItem(serviceUrl: string, itemId) {
    let requestHeaders, url;
    requestHeaders = this.headers;
    url = serviceUrl + BaseConstants.DELETE + '-user/' + itemId;
    return super.deleteRequest(url, requestHeaders);
  }

  saveItem(serviceUrl: string, item: any, isUpdateMode: boolean) {
    if (isUpdateMode) {
      return this.updateUser(serviceUrl, item);
    } else {
      return this.createUser(serviceUrl, item);
    }
  }

  private createUser(serviceUrl: string, item: any) {
    let requestHeaders, url;
    requestHeaders = this.headers;
    url = serviceUrl + BaseConstants.CREATE;
    return super.postRequest(url, item, { headers: requestHeaders });
  }

  private updateUser(serviceUrl: string, item: any) {
    let requestHeaders, url;
    requestHeaders = this.headers;
    url = serviceUrl + BaseConstants.EDIT + '-user/' + item.id;
    return super.putRequest(url, item, { headers: requestHeaders });
  }
}
