//import { Component, OnInit } from '@angular/core';
import { Component ,ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClaimsService } from 'src/app/shared/services/claims/claims.service';
import { ToastService } from 'src/app/shared/services/uitls/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';
import { FilterPojo } from 'src/app/shared/model/searching-pojos/filter.pojo';
import { BaseListComponent } from 'src/app/pages/full-layout-page/base-components/base-list-component';
import { ClaimsConstant } from 'src/app/shared/services/claims/Claims.constant';
import { DistributorsModel } from 'src/app/shared/model/master-data/distributors.model';
import { AuthConstant } from 'src/app/shared/services/auth/auth.constant';
import {ReportService} from "src/app/shared/services/report/report.service";
import {FormControl} from '@angular/forms';
import {SearchParPojo} from 'src/app/shared/model/searching-pojos/search.par.pojo.model';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import * as FileSaver from 'file-saver';









@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.scss'],
  providers: [ DatePipe ]

})



export class ClaimsComponent extends BaseListComponent implements OnInit  {

 

  @ViewChild('downloadFile') downloadFile: ElementRef;

 //discount
 cashDiscount : number;
 couponsDiscount:number;
 WHDiscount:number;
 otherDiscount:number;
 totalClaims :number;

 checkBtnFlag: boolean;
 confirmBtnFlag: boolean;
 loadBtnFlag: boolean;

 checkVal : string;

  // generate datatable
  claimsRows = [];
  tempClaims=[];

  // autoclaims branch datatable
  rows  = [];
  selectedList = [];


 // rows = [];
  isEditable = {};

  errorDataList=[];


  userId: string;
  //period: Date;
  period = new FormControl(new Date());
  periodStr: string;
  claimType: string;
  branchsList: any = [];


  @ViewChild('searchForm') searchForm: NgForm;

  constructor(private toast: ToastService,
    private spinner: NgxSpinnerService,
    private claimsSer: ClaimsService,
    private reportService: ReportService
    ,private datePipe: DatePipe,
    private toastr: ToastrService) {


    super(toast, spinner, claimsSer);

    this.checkBtnFlag = false;
    this.confirmBtnFlag = false;
    this.loadBtnFlag = false;

    this.checkVal ="true";
    this.serviceURL = ClaimsConstant.BASE_CLAIMS_URL;

    this.userId = sessionStorage.getItem(AuthConstant.USER_ID);
    this.claimType = "A";
    this.serviceURL = ClaimsConstant.DISTIBUTES_URL;
  }

  ngOnInit(): void {
    super.init();
    this.branchsList = [];
    this.rows=[];
    this.itemList=[];
    this.checkBtnFlag = false;
    this.confirmBtnFlag = false;
    this.loadBtnFlag = false;    
  }


  resetBtnFlags(){
    this.checkBtnFlag = false;
    this.confirmBtnFlag = false;
    this.loadBtnFlag = false;  
  }

  getAllDistributors() {
    this.resetBtnFlags()
    this.spinner.show();
    super.init();
    this.branchsList = [];
    this.rows = [];
    this.claimsRows = [];
    console.log(this.period.value);
    console.log(this.period.value);
    this.claimsSer.getAllDistributors()
      .subscribe((data: any) => {
        this.spinner.hide();
        this.rows = data.data;
        this.itemList=data.data;
        console.log(this.rows);
        this.toastr.success("success");
      }, (error: any) => {
        this.spinner.hide();
        this.rows = [];
        this.toastr.error(error.error);
      });
  }

  onSelect(row) {
    console.log(row.selected);
    this.branchsList=[];
    if( row.selected.length==0){
      this.checkBtnFlag=false;
      this.claimsRows=[];
      this.resetTotalValues();
    }
    row.selected.forEach(element => {
      this.branchsList.push(element.branchno);
    });  
  }



  updateSelectedCummdist() {
    this.spinner.show();
    this.claimsSer.updateSelectedCummdist(this.branchsList)
      .subscribe((data: any) => {
        this.spinner.hide();
        this.toast.setSuccessMsg("data update successfully" ,'');
        console.log(data.data);
      }, (error: any) => {
        this.spinner.hide();
        this.toast.setErrorMsg(error.error);
      });
  }


  generateAutoClaims() {
    this.resetTotalValues();
    this.spinner.show();
    this.claimsRows = [];
    this.claimsSer.generateAutoClaims(this.branchsList, this.datePipe.transform(this.period.value, 'dd/MM/yyyy')
    , this.userId, this.claimType)
      .subscribe((data: any) => {
        this.spinner.hide();
        this.claimsRows=data.data;
      if(this.claimsRows.length>0){  
        this.tempClaims= [...this.claimsRows];
       this.checkBtnFlag=true;
      }else{
        this.toast.setWarningMsg("no data found",'');
      }
      }, (error: any) => {
        this.spinner.hide();
        this.claimsRows = [];
        this.toast.setErrorMsg(error.error);
        this.checkBtnFlag=false;
      });
  }




  // check 
  checkAutoClaims() {
    this.errorDataList =[];
    this.spinner.show();
    this.claimsSer.checkAutoClaims(this.branchsList, this.datePipe.transform(this.period.value, 'dd/MM/yyyy'), this.userId, this.claimType)
      .subscribe((data: any) => {
        this.spinner.hide();
        this.errorDataList = data.data;
        if(this.errorDataList && this.errorDataList.length >0){
          this.confirmBtnFlag=false;
          this.toast.setErrorMsg("Data Check with error , please check rows with false value");
          this.claimsRows.forEach(element => {


            let data = this.errorDataList.find(ob => (ob.itemno === element.itemno
              && ob.conditionType === element.conditionType
              && ob.discount === element.discount
              && ob.discountType === element.discountType
              && ob.distno === element.distno
              && ob.internalorder === element.internalorder
              ));
            if(data!=null){
              console.log("exisit");
              element.checkVal="false";
              
            }
          });
        }else{
          this.confirmBtnFlag=true;
          this.toast.setSuccessMsg("Data Checked successful",'');
        }
        
      }, (error: any) => {
        this.confirmBtnFlag=false;
        this.claimsRows =[];
        this.spinner.hide();
        this.toast.setErrorMsg(error.error);
      });
  }

  // confirm 
  confirmAutoClaims() {
    this.spinner.show();
    this.claimsSer.confirmAutoClaims(this.datePipe.transform(this.period.value, 'dd/MM/yyyy'), this.claimType)
      .subscribe((data: any) => {
        this.spinner.hide();
        this.toast.setSuccessMsg(data.data,'');
        this.loadBtnFlag=true;
        console.log(data.data);
      }, (error: any) => {
        this.loadBtnFlag=false;
        this.spinner.hide();
        this.toast.setErrorMsg(error.error);
      });
  }


  // load 
  loadAutoClaims() {
    this.spinner.show();
    this.claimsSer.loadAutoClaims(this.datePipe.transform(this.period.value, 'dd/MM/yyyy'))
      .subscribe((data: any) => {
        this.spinner.hide();
        this.toast.setSuccessMsg(data.data,'');
        console.log(data.data);
      }, (error: any) => {
        this.spinner.hide();
        this.toast.setErrorMsg(error.error);
      });
  }


  // calc total 
  calcTotalClaimsClickBtn() {
    this.spinner.show();
    this.resetTotalValues();
    this.branchsList.forEach(element => {
      this.calcTotalClaims(element);
    });
   // this.spinner.hide();
  }

  resetTotalValues(){
    this.WHDiscount=0.0;
    this.cashDiscount=0.0;
    this.otherDiscount=0.0;
    this.couponsDiscount=0.0;
    this.totalClaims =0.0;
  }
  
  calcTotalClaims(branchno: string) {
    this.claimsSer.calcTotalClaims(branchno, this.datePipe.transform(this.period.value, 'dd/MM/yyyy'), this.claimType)
      .subscribe((data: any) => {
        this.spinner.hide();
        console.log(data.data);
          this.WHDiscount +=data.data.discountWH;
          this.cashDiscount +=data.data.discountCash;
          this.otherDiscount +=data.data.discountOther;
          this.couponsDiscount +=data.data.discountCoupons;
          this.totalClaims += this.WHDiscount+this.cashDiscount+this.otherDiscount+this.couponsDiscount;
          console.log(this.totalClaims);        
      }, (error: any) => {
        this.spinner.hide();
        this.toast.setErrorMsg(error.error);
      });
  }

  exportList() {
    this.spinner.show();
    console.log(this.datePipe.transform(this.period.value, 'dd/MM/yyyy')+"====" +this.period.value );
    return this.reportService.getReport(this.datePipe.transform(this.period.value, 'dd/MM/yyyy'))
      .subscribe((res) => {
        
        let data;
        data = new Blob([res.data], {type: 'application/ms-excel'});
        console.log("data len "+ res.data);
        this.downloadCLaimsFile(data);
        this.spinner.hide();
      }, (error) => {
        super.handleFailure(error);
      });
  }
  private downloadCLaimsFile(data) {
    FileSaver.saveAs(data, "Claims" + '_export_' + new Date().getTime() + '.CSV');
  }

  



  save(row, rowIndex) {
    this.isEditable[rowIndex] = !this.isEditable[rowIndex]
    console.log("Row saved: " + rowIndex);
    console.log(row);
    this.saveClaims(row);
  }

  saveClaims(row: any) {
    this.claimsSer.saveClaims(row, true).subscribe((data: any) => {
      console.log(data);
      if (data.success) {
        this.toast.setSuccessMsg('Distributor  saved', '');
      } else {
        row.defaultsurvey = 0;
        row.defaultSurveyFlag = false;
        this.toast.setErrorMsg(data.exceptionMessage);
      }
    }, (error: any) => {
      this.toast.setErrorMsg(error.error)

    });

  }

  // Delete row
  delete(row, rowIndex) {
    this.isEditable[rowIndex] = !this.isEditable[rowIndex]
    console.log("Row deleted: " + rowIndex);
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
  updateCliamFilter(event, prop) {
    const val = prop==='discount' ? event.target.value :event.target.value.toLowerCase();
    // filter our data
    const temp = this.tempClaims.filter(function(d) {
      if(prop==='discount'){
        return (d[prop]+"").indexOf(val) !== -1 || !val;
      }else{
        return d[prop].toLowerCase().indexOf(val) !== -1 || !val;
      }
      
    });
    // update the rows
    this.claimsRows = temp;
    // Whenever the filter changes, always go back to the first page
  //  if(val===""){ 
  //   this.setPage({offset: 0});
  //  }
  }
}
