import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderConstant } from 'src/app/shared/services/order/order.constant';
import { ToastService } from 'src/app/shared/services/uitls/toast.service';
import { StkTransactionService } from 'src/app/shared/services/order/order.service';
import { NgForm } from '@angular/forms';
import { BaseListComponent } from '../../base-components/base-list-component';
import { SelectionType } from '@swimlane/ngx-datatable';
import { StkTransHeaderModel } from 'src/app/shared/model/stk-transaction/stk-trans-header.model';

@Component({
  selector: 'app-stk-trans-header',
  templateUrl: './stk-trans-header.component.html',
  styleUrls: ['./stk-trans-header.component.scss'],
})
export class StkTransHeaderComponent
  extends BaseListComponent
  implements OnInit {
  @ViewChild('myTable') table: any;

  stkTransList: any = [];

  rows = [];
  isEditable = {};
  groups = [];
  selected: StkTransHeaderModel = new StkTransHeaderModel();
  SelectionType = SelectionType;

  @ViewChild('searchForm') searchForm: NgForm;

  constructor(
    private router: Router,
    private toast: ToastService,
    private spinner: NgxSpinnerService,
    private stkTransHeaderServ: StkTransactionService
  ) {
    super(toast, spinner, stkTransHeaderServ);
    this.serviceURL = OrderConstant.STK_TRANS_INOUT;
    this.getAllStkTransHeader();
  }

  ngOnInit(): void {
    super.init();
  }

  getAllStkTransHeader() {
    this.stkTransHeaderServ.getAllStkTransactions().subscribe(
      (data: any) => {
        this.spinner.hide();
        this.rows = data.data;
        this.searchingObject.size = 1;
        this.selected = this.rows[0];
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
      return d[prop].toString().toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.itemList = temp;
  }

  getGroupRowHeight(group, rowHeight) {
    let style = {};

    style = {
      height: group.length * 40 + 'px',
      width: '100%',
    };

    return style;
  }

  toggleExpandGroup(group) {
    console.log('Toggled Expand Group!', group);
    this.table.groupHeader.toggleExpandGroup(group);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);
  }

  onActivate(event) {
    console.log('Activate Event', event);
  }

  setPage(pageInfo: any) {
    super.setPage(pageInfo);
    if (this.rows !== null && this.rows.length > 0) {
      this.selected = this.rows[pageInfo.offset];
    }
  }
  navigateToStkTransDetails(row) {
    this.router.navigate(['/full-layout/stk-trans-details', row.transno]);
  }
}
