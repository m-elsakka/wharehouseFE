import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services/uitls/toast.service';
import { AuthConstant } from 'src/app/shared/services/auth/auth.constant';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

declare var appConfig: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  @ViewChild('f') loginForm: NgForm;

  appVersion: string;
  disableSubmitBtn: boolean;

  constructor(private toastSer: ToastService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private authSer: AuthService) {
    this.appVersion = appConfig['app-version'];
    this.disableSubmitBtn = false;
    if (authSer.isAuthenticated()) {
      this.router.navigate([AuthConstant.HOME]);
    }
  }

  onSubmit() {
    this.spinner.show();
    this.disableSubmitBtn = true;
    this.authSer.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe((data: any) => {
        this.spinner.hide();
        this.disableSubmitBtn = false;
        if (!data.success) {
          this.toastSer.setErrorMsg(data.exceptionMessage);
        } else {
          this.authSer.saveToke(this.loginForm.value.username, data.data, this.loginForm.value.rememberme);
        }
      }, (error: any) => {
        this.spinner.hide();
        this.disableSubmitBtn = false;
        this.toastSer.setErrorMsg(error.error);
      });
  }

}

