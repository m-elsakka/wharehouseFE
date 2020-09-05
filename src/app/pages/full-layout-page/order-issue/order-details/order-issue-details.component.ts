import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderConstant } from 'src/app/shared/services/order/order.constant';
import { ToastService } from 'src/app/shared/services/uitls/toast.service';
import { StkTransactionService } from 'src/app/shared/services/order/order.service';
import { NgForm } from '@angular/forms';
import { BaseListComponent } from '../../base-components/base-list-component';
import { SearchParPojo } from 'src/app/shared/model/searching-pojos/search.par.pojo.model';
import { StkTransDetailsModel } from 'src/app/shared/model/stk-transaction/stk-trans-details.model';
import { FilterPojo } from 'src/app/shared/model/searching-pojos/filter.pojo';

@Component({
  selector: 'app-order-issue-details',
  templateUrl: './order-issue-details.component.html',
  styleUrls: ['./order-issue-details.component.scss'],
})
export class OrderIssueDetailsComponent extends BaseListComponent
  implements OnInit {
  @ViewChild('downloadFile') downloadFile: ElementRef;

  transno: string;
  searchingObject: SearchParPojo;
  itemList: StkTransDetailsModel[];
  dataTableCount: number;

  rows = [];
  isEditable = {};

  @ViewChild('searchForm') searchForm: NgForm;

  constructor(
    private router: ActivatedRoute,
    private toast: ToastService,
    private spinner: NgxSpinnerService,
    private OrderIssueServ: StkTransactionService
  ) {
    super(toast, spinner, OrderIssueServ);
    this.serviceURL = OrderConstant.STK_TRANS_INOUT;
  }

  ngOnInit() {
    this.router.params.subscribe((params) => {
      this.transno = params['transno'];
      this.setSearchingObject();
      this.retrieveStkTransDetails();
    });
  }

  setSearchingObject() {
    this.searchingObject = new SearchParPojo();
    const filterObj: FilterPojo = new FilterPojo();
    filterObj.fieldName = 'transno';
    filterObj.filter = '' + this.transno;
    filterObj.type = '1';
    this.searchingObject.filtersList.push(filterObj);
  }

  retrieveStkTransDetails() {
    this.spinner.show();
    this.OrderIssueServ.findWithSearchPojo(
      this.serviceURL,
      this.searchingObject
    ).subscribe(
      (data: any) => {
        this.spinner.hide();
        this.itemList = this.handleRetrieveMasterDateSuccess(data);
        this.dataTableCount = this.itemList.length;
      },
      (error: any) => {
        this.spinner.hide();
        this.itemList = this.handleRetrieveMasterDateFailure(error);
        this.dataTableCount = this.itemList.length;
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

  parseDate(dateString: string): Date {
    if (dateString) {
      return new Date(Date.parse(dateString));
    } else {
      return null;
    }
  }

  downLoadStkTransReceipt(row: any) {
    const downLoadSearchObject: SearchParPojo = new SearchParPojo();
    downLoadSearchObject.page = 1;
    downLoadSearchObject.size = 1;

    const filterObj: FilterPojo = new FilterPojo();
    filterObj.fieldName = 'transno';
    filterObj.filter = this.transno;
    filterObj.type = '1';
    downLoadSearchObject.filtersList.push(filterObj);

    this.OrderIssueServ.downloadFileWithSearchParam(
      this.serviceURL,
      downLoadSearchObject
    ).subscribe(
      (res) => {
        let data = new Blob([res.data], { type: 'application/ms-excel' });
        this.downloadStkTransFile(data, res.fileName);
        this.spinner.hide();
      },
      (error: any) => {
        this.spinner.hide();
        this.toast.setErrorMsg(error.error);
      }
    );
  }

  downloadStkTransFile(data, fileName) {
    let url;
    url = window.URL.createObjectURL(data);
    this.downloadFile.nativeElement.download = fileName;
    this.downloadFile.nativeElement.href = url;
    this.downloadFile.nativeElement.click();
    window.URL.revokeObjectURL(url);
  }
}
