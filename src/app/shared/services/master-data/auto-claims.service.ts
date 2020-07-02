import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BaseHttpCrudService} from "../base/base-http-crud.service";
import {BaseConstants} from "../base/base.constants";
import {SearchParPojo} from "../../model/searching-pojos/search.par.pojo.model";
//import {SurveyConstant} from "../survey/survey.constant";

@Injectable()
export class AutoClaimsService extends BaseHttpCrudService {

  serviceUrl: string;

  constructor(private autoClaimsHttpSer: HttpClient) {
    super(autoClaimsHttpSer);
    this.serviceUrl = '/autoCliams/';
  }

  getAllAutoClaims() {
    return super.findAll(this.serviceUrl);
  }

  getAutoClaimsListBySearchObject(searchObject: SearchParPojo) {
    return super.findWithSearchPojo(this.serviceUrl, searchObject);
  }

}
