import {Injectable} from '@angular/core';
import {ConditionTypesConstant} from './ConditionTypes.constant';
import {BaseConstants} from '../base/base.constants';
import {BaseHttpCrudService} from "../base/base-http-crud.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ConditionTypesService extends BaseHttpCrudService {

  constructor(private httpSurveyGroupSer: HttpClient) {
    super(httpSurveyGroupSer);
  }

  getAllConditionTypes() {
    let headers, body;
    headers = this.headers;
    body = {};
    return super.getRequest(BaseConstants.CONDITION_TYPES_URL, {headers: headers});
  }

  saveConditionTypes(conditionType: any, isUpdateMode: any) {
    if (isUpdateMode) {
      return this.updateConditionTypes(conditionType);
    } else {
      return this.createNewConditionTypes(conditionType);
    }
  }



  private createNewConditionTypes(conditionType: any) {
    let headers;
    headers = this.headers;
    return super.postRequest(ConditionTypesConstant.CONDITION_TYPES_CREATE_URL, conditionType, {headers: headers});
  }

  private updateConditionTypes(conditionType: any) {
    let headers, url;
    headers = this.headers;
    url = ConditionTypesConstant.CONDITION_TYPES_UPDATE_URL + '/' + conditionType.scTypeid;
    return super.putRequest(url, conditionType, {headers: headers});
  }

}
