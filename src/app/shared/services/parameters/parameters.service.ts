import {Injectable} from '@angular/core';
import {ParametersConstant} from './parameters.constant';
import {BaseConstants} from '../base/base.constants';
import {BaseHttpCrudService} from "../base/base-http-crud.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ParametersService extends BaseHttpCrudService {

  constructor(private httpSurveyGroupSer: HttpClient) {
    super(httpSurveyGroupSer);
  }

  getAllParameters() {
    let headers, body;
    headers = this.headers;
    body = {};
    return super.getRequest(BaseConstants.PARAMETERS_URL, {headers: headers});
  }

  saveParameter(Parameters: any, isUpdateMode: any) {
    if (isUpdateMode) {
      return this.updateParameter(Parameters);
    } else {
      return this.createNewParameter(Parameters);
    }
  }



  private createNewParameter(Parameters: any) {
    let headers;
    headers = this.headers;
    return super.postRequest(ParametersConstant.PARAMETER_CREATE_URL, Parameters, {headers: headers});
  }

  private updateParameter(Parameter: any) {
    console.log("paraeer send : "+Parameter);
    let headers, url;
    headers = this.headers;
    url = ParametersConstant.PARAMETER_UPDATE_URL + '/' + Parameter.code;
    return super.putRequest(url, Parameter, {headers: headers});
  }

}
