import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../auth/auth.service';
import {AuthConstant} from '../auth/auth.constant';
import {Router} from '@angular/router';

declare var require: any;
const codes: any = require('../../../shared/data/app.codes.json');

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private showConflictErrorMsg: boolean;

  constructor(private toast: ToastrService, private authSer: AuthService, private router: Router) {
    this.showConflictErrorMsg = true;
  }

  setSuccessMsg(msg: string, title: string) {
    this.toast.success(msg, title);
  }

  setInfoMsg(msg: string, title: string) {
    this.toast.info(msg, title);
  }

  setWarningMsg(msg: string, title: string) {
    this.toast.warning(msg, title);
  }

  setErrorMsg(msg: string) {
    this.toast.error(msg, '', {closeButton: true, tapToDismiss: true, timeOut: 100000});
  }

  setObjectErrorMsg(error: any) {
    console.log(error);
    let msg;
    if (error.status === 403) {
      this.router.navigate(['/full-layout/access-denied']);
    } else if (error.status === 409) {
      if (this.showConflictErrorMsg) {
        this.showConflictErrorMsg = false;
        this.toast.error(codes.new_version, '', {disableTimeOut: true});
      }
    } else if (error.status === 401) {
      if (localStorage.getItem(AuthConstant.AUTHORIZATION) || sessionStorage.getItem(AuthConstant.AUTHORIZATION)) {
        this.clearAllToastMsg();
        this.authSer.logoutAction();
        msg = codes.unauthorized;
      }
    } else if (error.status === 406) {
      msg = codes[error.error.message];
    } else if (error.message && codes.hasOwnProperty(error.message)) {
      msg = codes[error.message];
    } else if (error.error && error.error.message && codes.hasOwnProperty(error.error.message)) {
      msg = codes[error.error.message];
    } else {
      msg = codes.General_error;
    }
    if (msg) {
      this.toast.error(msg, '', {closeButton: true, tapToDismiss: true, timeOut: 1000});
    }
  }

  clearAllToastMsg() {
    this.toast.clear();
  }
}
