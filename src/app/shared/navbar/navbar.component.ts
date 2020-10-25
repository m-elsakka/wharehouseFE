import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { ToastService } from '../services/uitls/toast.service';
import { TranslocoService } from '@ngneat/transloco';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
  selectedCabinet:string;

    constructor(private authSer: AuthService,private toastSer: ToastService
      ,private service: TranslocoService) {
    }

    logout() {
        this.authSer.logout()
        .subscribe((data: any) => {
        console.log(data.data);
        if (!data.success) {
          this.toastSer.setErrorMsg(data.exceptionMessage);
        } else {
          this.authSer.logoutAction();
        }
      }, (error: any) => {
        this.toastSer.setErrorMsg(error.error);
      });

    }

    getfullName(){
        return this.authSer.getfullName();
    }

    getSelectedUserCabinet(){
       this.selectedCabinet = this.authSer.getCurrentUserCabinet();
       return this.selectedCabinet;
    }
    status: string = "en";
    change(lang: string) {
      this.service.setActiveLang(lang);
      this.status = lang;       
    }
}
