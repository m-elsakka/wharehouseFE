import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';
import { BaseListComponent } from '../base-components/base-list-component';
import { CabinetService } from 'src/app/shared/services/master-data/cabinet.service';
import { ToastService } from 'src/app/shared/services/uitls/toast.service';
import { CabinetModel } from 'src/app/shared/model/master-data/cabinet.model';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss'],
})
export class CabinetListComponent extends BaseListComponent implements OnInit {
  // title: string = 'Cabinet';
  cabinetList: any = [];
  searchCabinetno: string;
  searchCabinetNamee: string;
  searchCabinetNamea: string;
  searchActive: string;

  rows = [];
  isEditable = {};
  isAddMode = {};

  @ViewChild('searchForm') searchForm: NgForm;

  constructor(
    private toast: ToastService,
    private spinner: NgxSpinnerService,
    private cabinetServ: CabinetService
  ) {
    super(toast, spinner, cabinetServ);
    this.searchCabinetno = 'all';
    this.searchCabinetNamee = 'all';
    this.searchCabinetNamea = 'all';
    this.searchActive = 'all';
    this.serviceURL = this.cabinetServ.serverUrl;
    this.getAllCabinet();
  }

  ngOnInit(): void {
    super.init();
    this.isUpdateMode = true;
  }

  getAllCabinet() {
    this.cabinetServ.getAllCabinet().subscribe(
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

  onRowStatusChange(row: any, value: any) {
    row.active = super.convertBooleanToNumber(value).toString();
  }

  validationCabinet(rowIndex) {
    let isValid = true;
    let detail;
    detail = this.itemList[rowIndex];
    if (
      detail.cabinetno === undefined ||
      detail.cabinetno === null ||
      detail.cabinetnamee === undefined ||
      detail.cabinetnamee === null ||
      detail.cabinetnamea === undefined ||
      detail.cabinetnamea === null ||
      detail.active === undefined ||
      detail.active === null
    ) {
      isValid = false;
      return isValid;
    }
    return isValid;
  }

  save(row, rowIndex) {
    if (this.validationCabinet(rowIndex)) {
      this.isEditable[rowIndex] = !this.isEditable[rowIndex];
      if (this.isAddMode[rowIndex]) {
        this.saveCabinet(row, false);
        this.isUpdateMode = true;
      } else {
        this.saveCabinet(row, true);
      }

      this.isAddMode[rowIndex] = false;
      console.log('Row saved: ' + rowIndex);
      console.log(row);
    } else {
      this.toast.setErrorMsg('Cabinet is not valid!');
    }
  }

  // Add new row
  addNewRow() {
    this.newItem = new CabinetModel();
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

  saveCabinet(row: any, isUpdateMode: boolean) {
    this.cabinetServ.saveCabinet(this.serviceURL, row, isUpdateMode).subscribe(
      (data: any) => {
        console.log(data);
        if (data.success) {
          this.toast.setSuccessMsg('Cabinet saved', '');
        } else {
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
