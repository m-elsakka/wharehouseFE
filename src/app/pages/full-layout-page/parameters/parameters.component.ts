//import { Component, OnInit } from '@angular/core';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ParametersService} from 'src/app/shared/services/parameters/parameters.service';
import {ToastService} from 'src/app/shared/services/uitls/toast.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {NgForm} from '@angular/forms';
import {FilterPojo} from 'src/app/shared/model/searching-pojos/filter.pojo';
import {BaseListComponent} from 'src/app/pages/full-layout-page/base-components/base-list-component';
import {ParametersConstant} from 'src/app/shared/services/parameters/parameters.constant';
import {ParametersModel} from 'src/app/shared/model/master-data/parameters.model ';
//import { DatatableComponent } from '@swimlane/ngx-datatable/release/components/datatable.component';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent extends BaseListComponent implements OnInit {

  ParametersList: any = [];
  searchparameterDescription: string;
  searchparameterCode: string;
  searchparameterValue: string;

  //@ViewChild('table') table: DatatableComponent;
  rows = [];
  isEditable = {};

  @ViewChild('searchForm') searchForm: NgForm;
  

  constructor(private toast: ToastService,
    private spinner: NgxSpinnerService,
    private paramSer: ParametersService) { 

    super(toast, spinner, paramSer);
    this.searchparameterCode = 'all';
    this.searchparameterValue = 'all';
    this.searchparameterDescription='all';
    this.serviceURL = ParametersConstant.BASE_PARAMETERS_URL;
    this.getAllParameters();
    
    }

  ngOnInit(): void {
    super.init();
        //this.temp.push(this.itemList);
  }

  getAllParameters() {
    this.paramSer.getAllParameters()
      .subscribe((data: any) => {
        this.spinner.hide();
        this.rows = data.data;
      }, (error: any) => {
        this.spinner.hide();
        this.rows = [];
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

  save(row, rowIndex){
    this.isEditable[rowIndex]=!this.isEditable[rowIndex]
    console.log("Row saved: "+ rowIndex);
    console.log(row);
    this.saveParameters(row);
  }

  // Delete row
  delete(row, rowIndex){
    this.isEditable[rowIndex]=!this.isEditable[rowIndex]
    console.log("Row deleted: "+ rowIndex);
  }



  saveParameters(row: any) {
      this.paramSer.saveParameter(row, true).subscribe((data: any) => {
        console.log(data);
        if (data.success) {
          this.toast.setSuccessMsg('Parameters saved', '');
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
