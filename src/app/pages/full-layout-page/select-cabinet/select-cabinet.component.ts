import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseListComponent } from '../base-components/base-list-component';
import { ToastService } from 'src/app/shared/services/uitls/toast.service';
import {UserManagerService} from 'src/app/shared/services/master-data/user-manager.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { FilterPojo } from 'src/app/shared/model/searching-pojos/filter.pojo';
import { SearchParPojo } from 'src/app/shared/model/searching-pojos/search.par.pojo.model';
import { UserModel } from 'src/app/shared/model/master-data/user.model';
import { AuthConstant } from 'src/app/shared/services/auth/auth.constant';
import { Router } from '@angular/router';


@Component({
  selector: 'select-cabinet',
  templateUrl: './select-cabinet.component.html',
  styleUrls: ['./select-cabinet.component.scss'],
})
export class SelectCabinetComponent extends BaseListComponent implements OnInit {
  ItemList: any = [];
  rows = [];

  constructor(
    private toast: ToastService,
    private spinner: NgxSpinnerService,
    private userManagerSer: UserManagerService,
    private authSer: AuthService,
    private router: Router
  ) {
    super(toast, spinner, userManagerSer);
    this.getUserCabinets();
  }

  ngOnInit(): void {
  }

  setCurrentUserCabinet(cabinet){
    this.authSer.setCurrentUserCabinet(cabinet);
    this.router.navigate([AuthConstant.STK_TRANSACTIONS]);
  }

  private getUserCabinets() {
    this.itemList = this.authSer.getCurrentUserCabinets();
  }

}
