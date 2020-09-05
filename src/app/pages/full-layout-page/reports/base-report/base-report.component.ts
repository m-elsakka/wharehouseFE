import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-base-report',
  templateUrl: './base-report.component.html',
  styleUrls: ['./base-report.component.scss']
})
export class BaseReportComponent implements OnInit {

  reports: any[];
  selectReport: any;

  constructor() {
    this.reports = [];
    this.reports.push({reportId: 1, reportNam: 'User Hierarchy'});
    this.reports.push({reportId: 2, reportNam: 'STK Transaction Details'});
  }

  ngOnInit() {
  }

}
