import {Injectable} from "@angular/core";
import {BaseHttpCrudService} from "../base/base-http-crud.service";
import {HttpClient} from "@angular/common/http";

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

}
