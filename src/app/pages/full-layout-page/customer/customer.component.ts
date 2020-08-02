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

  save(row, rowIndex) {
    this.isEditable[rowIndex] = !this.isEditable[rowIndex];
    console.log('Row saved: ' + rowIndex);
    console.log(row);
    this.saveCustomer(row);
  }

  // Delete row
  delete(row, rowIndex) {
    this.isEditable[rowIndex] = !this.isEditable[rowIndex];
    console.log('Row deleted: ' + rowIndex);
  }

  saveCustomer(row: any) {
    this.customerServ.saveCustomers(this.serviceURL, row, true).subscribe(
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
    console.log(this.temp + '0000 ' + this.customerList);
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function (d) {
      return d[prop].toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.customerList = temp;
  }
}
