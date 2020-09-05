import { NgForm } from '@angular/forms';
import { ToastService } from 'src/app/shared/services/uitls/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';

export class FormActionHandler {
  constructor(
    private toastService?: ToastService,
    private spinnerService?: NgxSpinnerService
  ) {}

  markFormGroupTouched(form: NgForm) {
    (<any>Object).values(form.controls).forEach((control) => {
      control.markAsTouched();
      if (control.controls) {
        control.controls.forEach((c) => this.markFormGroupTouched(c));
      }
    });
  }

  convertLocalDateTimeToJsDate(localDateTime: any) {
    let day, month, year, dateObj, dateList;
    dateList = localDateTime.substr(0, localDateTime.indexOf('-')).split('.');
    year = +dateList[0];
    month = +dateList[1];
    day = +dateList[2];
    dateObj = { year: year, month: month, day: day };
    return dateObj;
  }

  constractDateBeforeSubmit(dateObj: any) {
    let date;
    date = dateObj.year + '.' + dateObj.month + '.' + dateObj.day + '-00:00:00';
    return date;
  }

  castDate(dateObj: Date) {
    let year, month, day;

    if (dateObj instanceof Date) {
      year = dateObj.getFullYear();
      month = dateObj.getMonth() + 1;
      day = dateObj.getDate();
      let date;
      date = year + '.' + month + '.' + day + '-00:00:00';
      return date;
    } else {
      return dateObj;
    }
  }

  convertBooleanToNumber(value: any) {
    let result;
    if (value === true || value === 1) {
      result = 1;
    } else if (value === false || value === 0) {
      result = 0;
    } else {
      result = 0;
    }
    return result;
  }

  convertDateToStringFormat(dateSt: string) {
    let date, dateObj;
    dateObj = this.convertLocalDateTimeToJsDate(dateSt);
    date = dateObj.day + '/' + dateObj.month + '/' + dateObj.year;
    return date;
  }

  convertDateStartWithMonth(dateSt: string) {
    let date, dateObj;
    dateObj = this.convertLocalDateTimeToJsDate(dateSt);
    date = dateObj.month + '/' + dateObj.day + '/' + dateObj.year;
    return date;
  }

  disableSubmitForm(list: any[]) {
    let canSave;
    canSave = true;
    list.forEach(function (element) {
      if (element.canSaveFlag === false) {
        canSave = false;
      }
    });
    return canSave;
  }

  handleRetrieveMasterDateSuccess(data: any) {
    let list;
    if (!data.success) {
      this.toastService.setErrorMsg(data.exceptionMessage);
      list = [];
    } else {
      list = data.data;
    }
    return list;
  }

  handleRetrieveMasterDateFailure(error: any) {
    this.toastService.setErrorMsg(error.error);
    return [];
  }

  handleSuccess(data) {
    this.spinnerService.hide();
    let obj: any;
    obj = { data: [], totalElements: 5 };
    if (!data.success) {
      this.toastService.setErrorMsg(data.exceptionMessage);
    } else {
      obj = data.data;
    }
    return obj;
  }

  handleFailure(error) {
    this.spinnerService.hide();
    this.toastService.setErrorMsg(error.data.exceptionMessage);
    return [];
  }
}
