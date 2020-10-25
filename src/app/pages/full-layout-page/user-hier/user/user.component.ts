import { Component, Input, OnInit } from '@angular/core';
import { UserLevelModel } from '../../../../shared/model/master-data/user-level.model';
import { BaseItemComponent } from '../../base-components/base-item-component';
import { ToastService } from '../../../../shared/services/uitls/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserManagerService } from '../../../../shared/services/master-data/user-manager.service';
import { UserModel } from '../../../../shared/model/master-data/user.model';
import { SearchParPojo } from '../../../../shared/model/searching-pojos/search.par.pojo.model';
import { FilterPojo } from '../../../../shared/model/searching-pojos/filter.pojo';
import { BranchModel } from '../../../../shared/model/master-data/branch.model';
import { AuthorityService } from '../../../../shared/services/master-data/authority.service';
import { AuthorityModel } from '../../../../shared/model/master-data/authority.model';
import { CabinetModel } from 'src/app/shared/model/master-data/cabinet.model';
import { CabinetService } from 'src/app/shared/services/master-data/cabinet.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent extends BaseItemComponent implements OnInit {
  branches: BranchModel[];
  allAuthoritiesList: AuthorityModel[];
  userCabinets: any[];
  authorities: any[];

  constructor(
    private toast: ToastService,
    private spinner: NgxSpinnerService,
    private userManagerSer: UserManagerService,
    private cabinetSer: CabinetService,
    private authoritySer: AuthorityService
  ) {
    super(toast, spinner, userManagerSer);
    this.serviceURL = this.userManagerSer.serviceUrl;
    this.getAuthorities();
    this.getCabinets();
    this.authorities = [];
    this.userCabinets =[]; 
  }

  ngOnInit() {}

  activeStatusChange(value: any) {
    this.item.active = super.convertBooleanToNumber(value);
  }

  setPasswordRequired() {
    return true;
  }

  private getAuthorities() {
    this.authoritySer.getAllAuthorities().subscribe(
      (data: any) => {
        this.allAuthoritiesList = super.handleRetrieveMasterDateSuccess(data);
        this.authorities = this.allAuthoritiesList;
      },
      (error: any) => {
        super.handleRetrieveMasterDateFailure(error);
      }
    );
  }

  private getCabinets() {
    const cabinetSearchObj: SearchParPojo = new SearchParPojo();
    const activeFilter: FilterPojo = new FilterPojo();
    activeFilter.type = '2';
    activeFilter.filter = '1';
    activeFilter.fieldName = 'active';
    cabinetSearchObj.filtersList.push(activeFilter);

    this.cabinetSer.getCabinetListBySearchObject(cabinetSearchObj).subscribe(
      (data: any) => {
        this.userCabinets = super.handleRetrieveMasterDateSuccess(data);
      },
      (error: any) => {
        this.userCabinets=[];
        super.handleRetrieveMasterDateFailure(error);
      }
    );
  }
}
