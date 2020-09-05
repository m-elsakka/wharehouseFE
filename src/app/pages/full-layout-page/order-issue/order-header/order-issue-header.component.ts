import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderConstant } from 'src/app/shared/services/order/order.constant';
import { ToastService } from 'src/app/shared/services/uitls/toast.service';
import { StkTransactionService } from 'src/app/shared/services/order/order.service';
import { NgForm } from '@angular/forms';
import { BaseListComponent } from '../../base-components/base-list-component';

@Component({
  selector: 'app-order-issue-header',
  templateUrl: './order-issue-header.component.html',
  styleUrls: ['./order-issue-header.component.scss'],
})
export class OrderIssueHeaderComponent extends BaseListComponent
  implements OnInit {
  @ViewChild('uploadOrderIssueFile') uploadOrderIssueFile: ElementRef;

  stkTransList: any = [];
  searchTransno: string;
  searchPostdate: Date;
  searchAccountc: string;
  searchBranchno: string;
  searchAccountd: string;
  searchTransdesccode: string;

  rows = [];
  isEditable = {};

  @ViewChild('searchForm') searchForm: NgForm;

  constructor(
    private router: Router,
    private toast: ToastService,
    private spinner: NgxSpinnerService,
    private OrderIssueHeaderServ: StkTransactionService
  ) {
    super(toast, spinner, OrderIssueHeaderServ);
    this.serviceURL = OrderConstant.STK_TRANS_INOUT;

    this.searchTransno = 'all';
    this.searchAccountc = 'all';
    this.searchBranchno = 'all';
    this.searchAccountd = 'all';
    this.searchTransdesccode = 'all';

    this.getAllStkTransHeader();
  }

  ngOnInit(): void {
    super.init();
  }

  getAllStkTransHeader() {
    this.OrderIssueHeaderServ.getAllStkTransOut().subscribe(
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

  navigateToStkTransDetails(row) {
    this.router.navigate(['/full-layout/order-issue-details', row.transno]);
  }
}
