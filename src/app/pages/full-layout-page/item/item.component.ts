import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ItemService } from 'src/app/shared/services/master-data/item.service';
import { ItemModel } from 'src/app/shared/model/master-data/item.model';
import { NgForm } from '@angular/forms';
import { BaseListComponent } from '../base-components/base-list-component';
import { ToastService } from 'src/app/shared/services/uitls/toast.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemListComponent extends BaseListComponent implements OnInit {
  ItemList: any = [];
  searchItemno: string;
  searchItemNamee: string;
  searchItemNamea: string;
  searchItemNetWeight: string;
  searchItemType: string;
  searchItemUOM: string;

  rows = [];
  isEditable = {};
  isAddMode = {};

  @ViewChild('searchForm') searchForm: NgForm;

  constructor(
    private toast: ToastService,
    private spinner: NgxSpinnerService,
    private itemServ: ItemService
  ) {
    super(toast, spinner, itemServ);
    this.searchItemno = 'all';
    this.searchItemNamee = 'all';
    this.searchItemNamea = 'all';
    this.searchItemNetWeight = 'all';
    this.searchItemType = 'all';
    this.searchItemUOM = 'all';
    this.serviceURL = this.itemServ.serverUrl;
    this.getAllItem();
  }

  ngOnInit(): void {
    super.init();
    this.isUpdateMode = true;
  }

  getAllItem() {
    this.itemServ.getAllItems().subscribe(
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

  validationItem(rowIndex) {
    let isValid = true;
    let detail;
    detail = this.itemList[rowIndex];
    if (
      detail.itemno === undefined ||
      detail.itemno === null ||
      detail.itemnamee === undefined ||
      detail.itemnamee === null ||
      detail.itemnamea === undefined ||
      detail.itemnamea === null ||
      detail.netweight === undefined ||
      detail.netweight === null
    ) {
      isValid = false;
      return isValid;
    }
    return isValid;
  }

  save(row, rowIndex) {
    if (this.validationItem(rowIndex)) {
      this.isEditable[rowIndex] = !this.isEditable[rowIndex];
      if (this.isAddMode[rowIndex]) {
        this.saveItem(row, false);
        this.isUpdateMode = true;
      } else {
        this.saveItem(row, true);
      }

      this.isAddMode[rowIndex] = false;
      console.log('Row saved: ' + rowIndex);
      console.log(row);
    } else {
      this.toast.setErrorMsg('Item is not valid!');
    }
  }

  // Add new row
  addNewRow() {
    this.newItem = new ItemModel();
    let rowIndx = this.dataTableCount++;
    this.temp = [...this.temp, this.newItem];
    this.itemList = [...this.temp];

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

  saveItem(row: any, isUpdateMode: boolean) {
    this.itemServ.saveItems(this.serviceURL, row, isUpdateMode).subscribe(
      (data: any) => {
        console.log(data);
        if (data.success) {
          this.toast.setSuccessMsg('Item saved', '');
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
    // Whenever the filter changes, always go back to the first page
    //  if(val===""){
    //   this.setPage({offset: 0});
    //  }
  }
}
