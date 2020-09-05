import {ToastService} from "../../../shared/services/uitls/toast.service";
import {ReportService} from "../../../shared/services/report/report.service";
import {NgxSpinnerService} from "ngx-spinner";
import {ElementRef, ViewChild} from "@angular/core";
import {NgForm} from "@angular/forms";
import {ReportSearchPojo} from "../../../shared/model/searching-pojos/report-search-pojo";
import {FormActionHandler} from "../base-components/form.action.handler";

export class BaseReportActionComponent extends FormActionHandler {

  @ViewChild('searchForm') searchForm: NgForm;
  @ViewChild('downloadFile') downloadFile: ElementRef;

  constructor(private toast: ToastService,
              private reportService: ReportService,
              private spinner: NgxSpinnerService) {
    super(toast, spinner);
  }

  getReport(reportId: number, reportSearchPojo: ReportSearchPojo) {
    if (this.searchForm.valid) {
      this.spinner.show();
      this.reportService.getReport(reportId, reportSearchPojo)
        .subscribe((res) => {
          let data = new Blob([res.data], {type: 'application/ms-excel'});
          this.downloadSurveyFile(data, res.fileName);
          this.spinner.hide();
        }, (error: any) => {
          this.spinner.hide();
          this.toast.setErrorMsg(error.error);
        });
    } else {
      super.markFormGroupTouched(this.searchForm);
    }
  }

  downloadSurveyFile(data, fileName) {
    let url;
    url = window.URL.createObjectURL(data);
    this.downloadFile.nativeElement.download = fileName;
    this.downloadFile.nativeElement.href = url;
    this.downloadFile.nativeElement.click();
    window.URL.revokeObjectURL(url);
  }
}
