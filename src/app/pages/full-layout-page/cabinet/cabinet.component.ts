import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';
import { BaseListComponent } from '../base-components/base-list-component';
import { CabinetService } from 'src/app/shared/services/master-data/cabinet.service';
import { ToastService } from 'src/app/shared/services/uitls/toast.service';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss'],
})
export class CabinetListComponent extends BaseListComponent implements OnInit {
  cabinetList: any = [];
  searchCabinetno: string;
  searchCabinetNamee: string;
  searchCabinetNamea: string;
  searchActive: string;

  rows = [];
  isEditable = {};

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

  save(row, rowIndex) {
    this.isEditable[rowIndex] = !this.isEditable[rowIndex];
    console.log('Row saved: ' + rowIndex);
    console.log(row);
    this.saveCabinet(row);
  }

  // Delete row
  delete(row, rowIndex) {
    this.isEditable[rowIndex] = !this.isEditable[rowIndex];
    console.log('Row deleted: ' + rowIndex);
  }

  saveCabinet(row: any) {
    this.cabinetServ.saveCabinet(this.serviceURL, row, true).subscribe(
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
