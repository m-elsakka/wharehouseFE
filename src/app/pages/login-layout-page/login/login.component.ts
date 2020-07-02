import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services/uitls/toast.service';
import { AuthConstant } from 'src/app/shared/services/auth/auth.constant';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UserModel } from 'src/app/shared/model/master-data/user.model';

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

    if (this.loginForm.valid) {
    let userAuth: UserModel = new UserModel();
    userAuth.username = this.loginForm.value.username.trim();
    userAuth.password = this.loginForm.value.password;

    this.authSer.login(userAuth)
      .subscribe((data: any) => {
        this.spinner.hide();
        this.disableSubmitBtn = false;
        if (!data.success) {
          this.toastSer.setErrorMsg(data);
        } else {
          this.authSer.saveToke(data.data, this.loginForm.value.rememberme);
        }
      }, (error: any) => {
        this.spinner.hide();
        this.disableSubmitBtn = false;
        this.toastSer.setErrorMsg(error);
      });
  }
}

}

