import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerService } from 'src/app/shared/services/master-data/customer.service';
import { CustomerModel } from 'src/app/shared/model/master-data/customer.model';
import { NgForm } from '@angular/forms';
import { BaseListComponent } from '../base-components/base-list-component';
import { ToastService } from 'src/app/shared/services/uitls/toast.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerListComponent extends BaseListComponent implements OnInit {
  customerList: any = [];
  searchCustomerno: string;
  searchCustomerNamee: string;
  searchCustomerNamea: string;

  rows = [];
  isEditable = {};
  isAddMode = {};

  @ViewChild('searchForm') searchForm: NgForm;

  constructor(
    private toast: ToastService,
    private spinner: NgxSpinnerService,
    private customerServ: CustomerService
  ) {
    super(toast, spinner, customerServ);
    this.searchCustomerno = 'all';
    this.searchCustomerNamee = 'all';
    this.searchCustomerNamea = 'all';
    this.serviceURL = this.customerServ.serverUrl;
    this.getAllCustomer();
  }

  ngOnInit(): void {
    super.init();
    this.isUpdateMode = true;
  }

  getAllCustomer() {
    this.customerServ.getAllCustomers().subscribe(
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

  validationCustomer(rowIndex) {
    let isValid = true;
    let detail;
    detail = this.itemList[rowIndex];
    if (
      detail.customerno === undefined ||
      detail.customerno === null ||
      detail.customernamee === undefined ||
      detail.customernamee === null ||
      detail.customernamea === undefined ||
      detail.customernamea === null
    ) {
      isValid = false;
      return isValid;
    }
    return isValid;
  }

  save(row, rowIndex) {
    if (this.validationCustomer(rowIndex)) {
      this.isEditable[rowIndex] = !this.isEditable[rowIndex];
      if (this.isAddMode[rowIndex]) {
        this.saveCustomer(row, false);
        this.isUpdateMode = true;
      } else {
        this.saveCustomer(row, true);
      }

      this.isAddMode[rowIndex] = false;
      console.log('Row saved: ' + rowIndex);
      console.log(row);
    } else {
      this.toast.setErrorMsg('Customer is not valid!');
    }
  }

  // Add new row
  addNewRow() {
    this.newItem = new CustomerModel();
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

  saveCustomer(row: any, isUpdateMode: boolean) {
    this.customerServ
      .saveCustomers(this.serviceURL, row, isUpdateMode)
      .subscribe(
        (data: any) => {
          console.log(data);
          if (data.success) {
            this.toast.setSuccessMsg('Customer saved', '');
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
