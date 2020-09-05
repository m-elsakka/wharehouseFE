import { Component, Input, OnInit } from '@angular/core';
import { UserLevelModel } from '../../../../shared/model/master-data/user-level.model';
import { BaseItemComponent } from '../../base-components/base-item-component';
import { ToastService } from '../../../../shared/services/uitls/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserManagerService } from '../../../../shared/services/master-data/user-manager.service';
import { UserModel } from '../../../../shared/model/master-data/user.model';
import { SearchParPojo } from '../../../../shared/model/searching-pojos/search.par.pojo.model';
import { FilterPojo } from '../../../../shared/model/searching-pojos/filter.pojo';
import { BranchService } from '../../../../shared/services/master-data/branch.service';
import { BranchModel } from '../../../../shared/model/master-data/branch.model';
import { AuthorityService } from '../../../../shared/services/master-data/authority.service';
import { AuthorityModel } from '../../../../shared/model/master-data/authority.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent extends BaseItemComponent implements OnInit {
  @Input('userLevels') userLevels: UserLevelModel[];

  branches: BranchModel[];
  allAuthoritiesList: AuthorityModel[];
  authorities: any[];

  constructor(
    private toast: ToastService,
    private spinner: NgxSpinnerService,
    private userManagerSer: UserManagerService,
    private branchSer: BranchService,
    private authoritySer: AuthorityService
  ) {
    super(toast, spinner, userManagerSer);
    this.serviceURL = this.userManagerSer.serviceUrl;
    this.getBranches();
    this.getAuthorities();
    this.authorities = [];
  }

  ngOnInit() {}

  activeStatusChange(value: any) {
    this.item.active = super.convertBooleanToNumber(value);
  }

  levelNumberChange(levelNumber: number) {
    this.item.branchNo = '';
  }

  setPasswordRequired() {
    // for (let i = 0; i < this.item.authorities.length; i++) {
    //   let auth;
    //   auth = this.item.authorities[i];
    //   if (auth.name === 'ROLE_SALES_FORCE') {
    //     return true;
    //   }
    // }
    return true;
  }

  private getBranches() {
    const branchSearchObj: SearchParPojo = new SearchParPojo();
    const activeFilter: FilterPojo = new FilterPojo();
    activeFilter.type = '2';
    activeFilter.filter = 'Y';
    activeFilter.fieldName = 'active';
    branchSearchObj.filtersList.push(activeFilter);

    this.branchSer.getBranchListBySearchObject(branchSearchObj).subscribe(
      (data: any) => {
        this.branches = super.handleRetrieveMasterDateSuccess(data);
      },
      (error: any) => {
        this.branches = [];
        super.handleRetrieveMasterDateFailure(error);
      }
    );
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
}
