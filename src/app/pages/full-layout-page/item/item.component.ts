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

  save(row, rowIndex) {
    this.isEditable[rowIndex] = !this.isEditable[rowIndex];
    console.log('Row saved: ' + rowIndex);
    console.log(row);
    this.saveItem(row);
  }

  // Delete row
  delete(row, rowIndex) {
    this.isEditable[rowIndex] = !this.isEditable[rowIndex];
    console.log('Row deleted: ' + rowIndex);
  }

  saveItem(row: any) {
    this.itemServ.saveItems(row).subscribe(
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
