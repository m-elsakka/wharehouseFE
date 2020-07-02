import {Injectable} from '@angular/core';
import {BaseHttpCrudService} from '../base/base-http-crud.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AuthorityService extends BaseHttpCrudService {

  serviceUrl: string;

  constructor(private authorityHttpSer: HttpClient) {
    super(authorityHttpSer);
    this.serviceUrl = 'usermanagement/authorities/';
  }

  getAllAuthorities() {
    return super.findAll(this.serviceUrl);
  }
}
