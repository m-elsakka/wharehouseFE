//import { Component, OnInit } from '@angular/core';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConditionTypesService } from 'src/app/shared/services/conditionTypes/conditionTypes.service';
import { ToastService } from 'src/app/shared/services/uitls/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';
import { FilterPojo } from 'src/app/shared/model/searching-pojos/filter.pojo';
import { BaseListComponent } from 'src/app/pages/full-layout-page/base-components/base-list-component';
import { ConditionTypesConstant } from 'src/app/shared/services/conditionTypes/ConditionTypes.constant';
import { ConditionTypesModel } from 'src/app/shared/model/master-data/conditionTypes.model';
//import { DatatableComponent } from '@swimlane/ngx-datatable/release/components/datatable.component';



@Component({
  selector: 'app-condition-types',
  templateUrl: './condition-types.component.html',
  styleUrls: ['./condition-types.component.scss']
})
export class ConditionTypesComponent extends BaseListComponent implements OnInit {

  checked = false;
  onInvoiceData = [
    { label: 'Yes', value: 'Y' },
    { label: 'No', value: 'N' }
  ]

  // @ViewChild('table') table: DatatableComponent;
  rows = [];
  isEditable = {};

  ConditionTypesList: any = [];
  searchConditionTypesDescription: string;
  searchConditionTypesScenario: string;
  searchConditionTypesConditionType: string;



  @ViewChild('searchForm') searchForm: NgForm;

  constructor(private toast: ToastService,
    private spinner: NgxSpinnerService,
    private conditionTypesSer: ConditionTypesService) {

    super(toast, spinner, conditionTypesSer);
    this.searchConditionTypesScenario = 'all';
    this.searchConditionTypesConditionType = 'all';
    this.searchConditionTypesDescription = 'all';
    this.serviceURL = ConditionTypesConstant.BASE_CONDITION_TYPES_URL;
    this.getAllConditionTypes();
  }

  ngOnInit(): void {
    super.init();
  }

  getAllConditionTypes() {
    this.conditionTypesSer.getAllConditionTypes()
      .subscribe((data: any) => {
        this.spinner.hide();
        this.ConditionTypesList = data.data;
      }, (error: any) => {
        this.spinner.hide();
        this.ConditionTypesList = [];
        this.toast.setErrorMsg(error.error);
      });
  }

  // Open/close panel  
  // toggleExpandRow(row, expanded) {
  //   this.table.rowDetail.toggleExpandRow(row);
  //   if(!expanded){
  //     this.table.rowDetail.collapseAllRows();
  //     this.table.rowDetail.toggleExpandRow(row);
  //   }
  //   else if (expanded){
  //     this.table.rowDetail.collapseAllRows();
  //   }
  // }

  save(row, rowIndex) {
    this.isEditable[rowIndex] = !this.isEditable[rowIndex]
    console.log("Row saved: " + rowIndex);
    console.log(row);
    this.saveConditionTypes(row);
  }

  // Delete row
  delete(row, rowIndex) {
    this.isEditable[rowIndex] = !this.isEditable[rowIndex]
    console.log("Row deleted: " + rowIndex);
  }



  saveConditionTypes(row: any) {
    this.conditionTypesSer.saveConditionTypes(row, true).subscribe((data: any) => {
      console.log(data);
      if (data.success) {
        this.toast.setSuccessMsg('Condition Types saved', '');
      } else {
        row.defaultsurvey = 0;
        row.defaultSurveyFlag = false;
        this.toast.setErrorMsg(data.exceptionMessage);
      }
    }, (error: any) => {
      this.toast.setErrorMsg(error.error)

    });

  }


  updateFilter(event, prop) {
    console.log(this.temp+"0000 " + this.itemList);
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function(d) {
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
