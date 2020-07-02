import {BaseHttpCrudService} from 'src/app/shared/services/base/base-http-crud.service';
import {NgxSpinnerService} from 'ngx-spinner';
import swal from 'sweetalert2';
import {ToastService} from 'src/app/shared/services/uitls/toast.service';
import {EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormActionHandler} from './form.action.handler';
import {NgForm} from '@angular/forms';

export class BaseItemComponent extends FormActionHandler {

  @Input() item: any;
  @Input() isUpdateMode: boolean;
  @Output() renderFormEvent = new EventEmitter<{ renderForm: boolean }>();
  @ViewChild('submitItemForm') submitItemForm: NgForm;

  serviceURL: string;

  constructor(private toastSer: ToastService,
              private spinnerSer: NgxSpinnerService,
              private crudSer: BaseHttpCrudService) {
    super();
  }

  init() {
  }

  onFormSubmit() {
    if (this.submitItemForm.valid) {
      this.spinnerSer.show();
      this.crudSer.saveItem(this.serviceURL, this.item, this.isUpdateMode)
        .subscribe((data: any) => {
          this.handleSaveSuccess(data);
        }, (error: any) => {
          this.handleSaveFailure(error);
        });
    } else {
      super.markFormGroupTouched(this.submitItemForm);
    }
  }

  onFormCancel() {
    swal.fire({
      title: '', text: 'Are you sure you want to discard changes?', icon: 'warning',
       showCancelButton: true,
      confirmButtonColor: '#3085d6', cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: "No"
    }).then((result) => {
      if (result.value) {
        this.renderFormEvent.emit({renderForm: false});
      }
    });
  }

  handleSaveSuccess(data: any) {
    this.spinnerSer.hide();
    if (!data.success) {
      this.toastSer.setErrorMsg(data.exceptionMessage);
    } else {
      this.renderFormEvent.emit({renderForm: false});
    }
  }

  handleSaveFailure(error: any) {
    this.spinnerSer.hide();
    this.toastSer.setErrorMsg(error.error);
  }

}
