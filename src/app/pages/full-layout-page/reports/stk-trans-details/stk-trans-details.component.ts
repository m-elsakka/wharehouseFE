import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../../../shared/services/uitls/toast.service';
import { ReportService } from '../../../../shared/services/report/report.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseReportActionComponent } from '../base-report-action-component';
import { ReportSearchPojo } from '../../../../shared/model/searching-pojos/report-search-pojo';
import { ReportParamtersPojo } from '../../../../shared/model/searching-pojos/report-paramters-pojo';
import { CabinetService } from 'src/app/shared/services/master-data/cabinet.service';

@Component({
  selector: 'app-stk-trans-details',
  templateUrl: './stk-trans-details.component.html',
  styleUrls: ['./stk-trans-details.component.scss'],
})
export class StkTransDetailsReportComponent
  extends BaseReportActionComponent
  implements OnInit {
  cabinetList: any[];
  selectedCabinet: any;

  constructor(
    private reportToast: ToastService,
    private reportSer: ReportService,
    private cabinetSer: CabinetService,
    private reportSpinner: NgxSpinnerService
  ) {
    super(reportToast, reportSer, reportSpinner);
  }

  ngOnInit() {
    this.getCabinets();
  }

  onSearch() {
    super.getReport(2, this.setupReportSearchPojo());
  }

  private setupReportSearchPojo() {
    let reportSearchPojo: ReportSearchPojo = new ReportSearchPojo();
    let cabinetParam: ReportParamtersPojo = new ReportParamtersPojo();

    cabinetParam.paramName = 'cabinetno';
    cabinetParam.paramType = 1;
    cabinetParam.paramValue = this.selectedCabinet;

    reportSearchPojo.reportParamtersList.push(cabinetParam);

    return reportSearchPojo;
  }

  getCabinets() {
    this.cabinetSer.getAllCabinet().subscribe(
      (data: any) => {
        this.cabinetList = super.handleRetrieveMasterDateSuccess(data);
      },
      (error: any) => {
        this.cabinetList = super.handleRetrieveMasterDateFailure(error);
      }
    );
  }
}
