import {Component, OnInit} from '@angular/core';
import {ToastService} from "../../../../shared/services/uitls/toast.service";
import {ReportService} from "../../../../shared/services/report/report.service";
import {NgxSpinnerService} from "ngx-spinner";
import {BaseReportActionComponent} from "../base-report-action-component";
import {ReportSearchPojo} from "../../../../shared/model/searching-pojos/report-search-pojo";
import {BranchModel} from "../../../../shared/model/master-data/branch.model";
import {BranchService} from "../../../../shared/services/master-data/branch.service";
import {ReportParamtersPojo} from "../../../../shared/model/searching-pojos/report-paramters-pojo";
import {AuthConstant} from "../../../../shared/services/auth/auth.constant";

@Component({
  selector: 'app-user-hier',
  templateUrl: './user-hier.component.html',
  styleUrls: ['./user-hier.component.scss']
})
export class UserHierComponent extends BaseReportActionComponent implements OnInit {

  branches: BranchModel[];
  selectedBranches: BranchModel[];
  currentUserId: string;

  constructor(private reportToast: ToastService,
              private reportSer: ReportService,
              private branchSer: BranchService,
              private reportSpinner: NgxSpinnerService) {
    super(reportToast, reportSer, reportSpinner);
    this.getBranches();
    this.currentUserId = sessionStorage.getItem(AuthConstant.USER_ID);
  }

  ngOnInit() {
  }

  onSearch() {
    super.getReport(1, this.setupReportSearchPojo());
  }

  private setupReportSearchPojo() {
    let reportSearchPojo: ReportSearchPojo = new ReportSearchPojo();
    let userParam: ReportParamtersPojo = new ReportParamtersPojo();
    if (this.selectedBranches.length > 0) {
      let branchCodeList: any[] = [];
      let branchParam: ReportParamtersPojo = new ReportParamtersPojo();
      this.selectedBranches.forEach((element) => {
        branchCodeList.push(element.branchno);
      });
      branchParam.paramName = 'distList';
      branchParam.paramType = 4;
      branchParam.paramValue = branchCodeList;
      reportSearchPojo.reportParamtersList.push(branchParam);
    }

    userParam.paramName = 'userId';
    userParam.paramType = 3;
    userParam.paramValue = this.currentUserId;
    reportSearchPojo.reportParamtersList.push(userParam);

    return reportSearchPojo;
  }

  private getBranches() {
    this.reportSpinner.show();
    this.branchSer.getAllBranches().subscribe((data: any) => {
      this.branches = super.handleSuccess(data);
      this.selectedBranches = this.branches;
    }, (error: any) => {
      this.branches = [];
      super.handleFailure(error);
    });
  }
}
