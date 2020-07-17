import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BranchService } from 'src/app/shared/services/master-data/branch.service';
import { NgForm } from '@angular/forms';
import { BaseListComponent } from '../base-components/base-list-component';
import { ToastService } from 'src/app/shared/services/uitls/toast.service';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss'],
})
export class BranchListComponent extends BaseListComponent implements OnInit {
  BranchList: any = [];
  searchBranchNo: string;
  searchBranchNamea: string;
  searchBranchNamee: string;
  searchRegion: string;

  rows = [];
  isEditable = {};

  @ViewChild('searchForm') searchForm: NgForm;

  constructor(
    private toast: ToastService,
    private spinner: NgxSpinnerService,
    private branchServ: BranchService
  ) {
    super(toast, spinner, branchServ);
    this.searchBranchNo = 'all';
    this.searchBranchNamea = 'all';
    this.searchBranchNamee = 'all';
    this.searchRegion = 'all';

    this.serviceURL = this.branchServ.serverUrl;
    this.getAllBranch();
  }

  ngOnInit(): void {
    super.init();
  }

  getAllBranch() {
    this.branchServ.getAllBranches().subscribe(
      (data: any) => {
        this.spinner.hide();
        this.rows = data.data;
      },
      (error: any) => {
        this.spinner.hide();
        this.rows = [];
        this.toast.setErrorMsg(error.error);
      }
    );
  }

  save(row, rowIndex) {
    this.isEditable[rowIndex] = !this.isEditable[rowIndex];
    console.log('Row saved: ' + rowIndex);
    console.log(row);
    this.saveBranch(row);
  }

  // Delete row
  delete(row, rowIndex) {
    this.isEditable[rowIndex] = !this.isEditable[rowIndex];
    console.log('Row deleted: ' + rowIndex);
  }

  saveBranch(row: any) {
    this.branchServ.saveItem(this.serviceURL, row, true).subscribe(
      (data: any) => {
        console.log(data);
        if (data.success) {
          this.toast.setSuccessMsg('Branch saved', '');
        } else {
          row.defaultsurvey = 0;
          row.defaultSurveyFlag = false;
          this.toast.setErrorMsg(data.exceptionMessage);
        }
      },
      (error: any) => {
        this.toast.setErrorMsg(error.error);
      }
    );
  }

  updateFilter(event, prop) {
    console.log(this.temp + '0000 ' + this.itemList);
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function (d) {
      return d[prop].toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.itemList = temp;
  }
}
