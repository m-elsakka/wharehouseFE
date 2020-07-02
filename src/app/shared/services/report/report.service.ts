import {Injectable} from "@angular/core";
import {BaseHttpCrudService} from "../base/base-http-crud.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ReportService extends BaseHttpCrudService {

  serviceUrl: string;

  constructor(private httpSurveyGroupSer: HttpClient) {
    super(httpSurveyGroupSer);
    this.serviceUrl = 'claims/findReport';
  }

  getReport(period:any) {
    console.log([period]);
    const url = this.serviceUrl+"?period=" +period;
    return super.downloadFile(url);
  }

}
