import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseHttpCrudService } from '../base/base-http-crud.service';
import { BaseConstants } from '../base/base.constants';
import { SearchParPojo } from '../../model/searching-pojos/search.par.pojo.model';
import { FilterPojo } from '../../model/searching-pojos/filter.pojo';
import { OrderConstant } from './order.constant';

@Injectable()
export class StkTransactionService extends BaseHttpCrudService {
  serverUrl: string;

  constructor(private httpStkTransactionSer: HttpClient) {
    super(httpStkTransactionSer);
    this.serverUrl = OrderConstant.STK_TRANS_INOUT;
  }

  getAllStkTransIn() {
    return super.findStkTransInOut('in');
  }

  getAllStkTransOut() {
    return super.findStkTransInOut('out');
  }

  getAllStkTransactions() {
    return super.findAll(this.serverUrl);
  }

  getCustomersListBySearchObject(searchObject: SearchParPojo) {
    return super.findWithSearchPojo(this.serverUrl, searchObject);
  }

  uploadOrderHeader(fileToUpload: File, transno: number) {
    const formData: FormData = new FormData();
    let multipartHeaders;
    multipartHeaders = this.multipartHeaders;
    formData.append('transno', '' + transno);
    formData.append('transFile', fileToUpload, fileToUpload.name);
    return super.postRequest(OrderConstant.STK_TRANS_UPLOAD, formData, {
      headers: multipartHeaders,
    });
  }
}
