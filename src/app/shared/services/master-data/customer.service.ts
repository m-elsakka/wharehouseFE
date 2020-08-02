import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHttpCrudService } from '../base/base-http-crud.service';
import { MasterDataConstant } from './master-data.constant';
import { SearchParPojo } from '../../model/searching-pojos/search.par.pojo.model';

@Injectable()
export class CustomerService extends BaseHttpCrudService {
  serverUrl: string;

  constructor(private itemHttpSer: HttpClient) {
    super(itemHttpSer);
    this.serverUrl = MasterDataConstant.CUSTOMER_BASE;
  }

  getAllCustomers() {
    return super.findAll(this.serverUrl);
  }

  getCustomersListBySearchObject(searchObject: SearchParPojo) {
    return super.findWithSearchPojo(this.serverUrl, searchObject);
  }

  saveCustomers(serviceUrl: string, item: any, isUpdateMode: boolean) {
    if (isUpdateMode) {
      return this.updateCustomers(serviceUrl, item);
    } else {
      return this.createCustomers(serviceUrl, item);
    }
  }

  private createCustomers(serviceUrl: string, item: any) {
    let requestHeaders, url;
    requestHeaders = this.headers;
    url = serviceUrl + 'create';
    return super.postRequest(url, item, { headers: requestHeaders });
  }

  private updateCustomers(serviceUrl: string, item: any) {
    let requestHeaders, url;
    requestHeaders = this.headers;
    url = serviceUrl + 'edit/' + item.customerno;
    return super.putRequest(url, item, { headers: requestHeaders });
  }
}
