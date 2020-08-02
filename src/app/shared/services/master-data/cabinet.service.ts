import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHttpCrudService } from '../base/base-http-crud.service';
import { MasterDataConstant } from './master-data.constant';
import { SearchParPojo } from '../../model/searching-pojos/search.par.pojo.model';

@Injectable()
export class CabinetService extends BaseHttpCrudService {
  serverUrl: string;

  constructor(private itemHttpSer: HttpClient) {
    super(itemHttpSer);
    this.serverUrl = MasterDataConstant.CABINET_BASE;
  }

  getAllCabinet() {
    return super.findAll(this.serverUrl);
  }

  getCabinetListBySearchObject(searchObject: SearchParPojo) {
    return super.findWithSearchPojo(this.serverUrl, searchObject);
  }

  saveCabinet(serviceUrl: string, item: any, isUpdateMode: boolean) {
    if (isUpdateMode) {
      return this.updateCabinet(serviceUrl, item);
    } else {
      return this.createCabinet(serviceUrl, item);
    }
  }

  private createCabinet(serviceUrl: string, item: any) {
    let requestHeaders, url;
    requestHeaders = this.headers;
    url = serviceUrl + 'create';
    return super.postRequest(url, item, { headers: requestHeaders });
  }

  private updateCabinet(serviceUrl: string, item: any) {
    let requestHeaders, url;
    requestHeaders = this.headers;
    url = serviceUrl + 'edit/' + item.cabinetno;
    return super.putRequest(url, item, { headers: requestHeaders });
  }
}
