import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BranchService } from 'src/app/shared/services/master-data/branch.service';
import { NgForm } from '@angular/forms';
import { BaseListComponent } from '../base-components/base-list-component';
import { ToastService } from 'src/app/shared/services/uitls/toast.service';
import { BranchModel } from 'src/app/shared/model/master-data/branch.model';

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
  isAddMode = {};

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
    this.isUpdateMode = true;
  }

  getAllBranch() {
    this.branchServ.getAllBranches().subscribe(
      (data: any) => {
        this.spinner.hide();
        this.rows = data.data;
        console.log('data' + this.rows[0].branchno);
      },
      (error: any) => {
        this.spinner.hide();
        this.rows = [];
        this.toast.setErrorMsg(error.error);
      }
    );
  }

  validationBranch(rowIndex) {
    let isValid = true;
    let detail;
    detail = this.itemList[rowIndex];
    if (
      detail.branchno === undefined ||
      detail.branchno === null ||
      detail.branchnamee === undefined ||
      detail.branchnamee === null ||
      detail.branchnamea === undefined ||
      detail.branchnamea === null
    ) {
      isValid = false;
      return isValid;
    }
    return isValid;
  }

  save(row, rowIndex) {
    if (this.validationBranch(rowIndex)) {
      this.isEditable[rowIndex] = !this.isEditable[rowIndex];
      if (this.isAddMode[rowIndex]) {
        this.saveBranch(row, false);
        this.isUpdateMode = true;
      } else {
        this.saveBranch(row, true);
      }

      this.isAddMode[rowIndex] = false;
      console.log('Row saved: ' + rowIndex);
      console.log(row);
    } else {
      this.toast.setErrorMsg('Plant is not valid!');
    }
  }

  // Add new row
  addNewRow() {
    this.newItem = new BranchModel();
    let rowIndx = this.dataTableCount++;
    this.temp = [...this.temp, this.newItem];
    this.itemList = this.temp;

    this.isEditable[rowIndx] = true; // enable editable fields
    this.isAddMode[rowIndx] = true; //enable sequence field
    this.isUpdateMode = false; //disable add button

    console.log('New row added ' + this.newItem + '0000 ' + rowIndx);
  }

  // Delete row
  delete(row, rowIndex) {
    if (this.isAddMode[rowIndex]) {
      this.isEditable[rowIndex] = false;
      this.isUpdateMode = true;

      this.temp = [...this.itemList];
      this.temp.splice(rowIndex, 1);
      this.itemList = [...this.temp];
      this.dataTableCount--;
    } else {
      this.isEditable[rowIndex] = !this.isEditable[rowIndex];
    }
    console.log('Row deleted: ' + rowIndex);
  }

  saveBranch(row: any, isUpdateMode: boolean) {
    this.branchServ.saveBranch(this.serviceURL, row, isUpdateMode).subscribe(
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
