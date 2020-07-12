import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHttpCrudService } from '../base/base-http-crud.service';
import { MasterDataConstant } from './master-data.constant';
import { SearchParPojo } from '../../model/searching-pojos/search.par.pojo.model';

@Injectable()
export class BranchService extends BaseHttpCrudService {
  serverUrl: string;

  constructor(private branchHttpSer: HttpClient) {
    super(branchHttpSer);
    this.serverUrl = MasterDataConstant.BRANCH_BASE;
  }

  getAllBranches() {
    return super.findAll(this.serverUrl);
  }

  getBranchListBySearchObject(searchObject: SearchParPojo) {
    return super.findWithSearchPojo(this.serverUrl, searchObject);
  }
}
