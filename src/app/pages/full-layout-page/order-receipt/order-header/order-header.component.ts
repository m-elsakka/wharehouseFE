import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BaseItemComponent } from '../../base-components/base-item-component';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderConstant } from 'src/app/shared/services/order/order.constant';
import { ToastService } from 'src/app/shared/services/uitls/toast.service';
import { StkTransDetailsModel } from 'src/app/shared/model/stk-transaction/stk-trans-details.model';
import { StkTransactionService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-order-receipt-header',
  templateUrl: './order-receipt-header.component.html',
  styleUrls: ['./order-receipt-header.component.scss'],
})
export class OrderReceiptHeaderComponent extends BaseItemComponent
  implements OnInit {
  canEdit: boolean;
  @ViewChild('uploadOrderReceiptFile') uploadOrderReceiptFile: ElementRef;

  constructor(
    private router: Router,
    private toast: ToastService,
    private spinner: NgxSpinnerService,
    private orderReceiptHeaderServ: StkTransactionService
  ) {
    super(toast, spinner, orderReceiptHeaderServ);
    this.serviceURL = OrderConstant.STK_TRANS_BASE;
  }

  ngOnInit() {
    if (!this.item.status) {
      this.canEdit = true;
    } else {
      this.canEdit = false;
    }
  }

  addNewOrderReceiptDetails() {
    this.item.stkTransDetailsList.push(new StkTransDetailsModel());
  }

  onFormSubmit() {
    if (this.submitItemForm.valid && this.validationDetails()) {
      super.onFormSubmit();
    } else {
      this.toast.setErrorMsg('item not valid!');
      super.markFormGroupTouched(this.submitItemForm);
    }
  }
  //   sortingSaleSectorList() {
  //     this.salesectorList.sort((a, b) => a.namee.localeCompare(b.namee));
  //   }
  validationDetails() {
    let isValid = true;
    for (let i = 0; i < this.item.stkTransDetailsList.length; i++) {
      let detail;
      detail = this.item.stkTransDetailsList[i];
      if (
        detail.itemno === null ||
        detail.itemno === undefined ||
        detail.qcrt === null ||
        detail.qcrt === undefined
      ) {
        isValid = false;
        return isValid;
      }
    }
    return isValid;
  }

  clearOrderReceiptDetails() {
    this.item.stkTransDetailsList = [];
  }

  removeNewAddedDetail(index: number) {
    this.item.stkTransDetailsList.splice(index, 1);
  }

  uploadOrderReceiptHeader(event: any) {
    let fileTmp: File;
    fileTmp = event.target.files[0];
    this.orderReceiptHeaderServ
      .uploadOrderReceiptHeader(fileTmp, this.item.transno)
      .subscribe(
        (data: any) => {
          this.uploadOrderReceiptFile.nativeElement.value = '';
          this.handleSaveSuccess(data);
        },
        (error: any) => {
          this.uploadOrderReceiptFile.nativeElement.value = '';
          this.toast.setErrorMsg(error.error);
        }
      );
  }
}
