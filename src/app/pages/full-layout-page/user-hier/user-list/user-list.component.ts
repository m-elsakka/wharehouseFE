import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from '../../base-components/base-list-component';
import { ToastService } from '../../../../shared/services/uitls/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FilterPojo } from '../../../../shared/model/searching-pojos/filter.pojo';
import { UserManagerService } from '../../../../shared/services/master-data/user-manager.service';
import { UserModel } from '../../../../shared/model/master-data/user.model';
import { BranchModel } from '../../../../shared/model/master-data/branch.model';
import { CabinetModel } from 'src/app/shared/model/master-data/cabinet.model';
import { CabinetService } from 'src/app/shared/services/master-data/cabinet.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent extends BaseListComponent implements OnInit {
  searchUserName: string;
  searchFirstName: string;
  searchLastName: string;
  searchActive: number;
  // searchCabinet: string;
  // searchJobDescription: string;
  // searchUserLevel: number;
  // searchBranch: string;

  // branches: BranchModel[];
  // userLevels: UserLevelModel[];

  constructor(
    private toast: ToastService,
    private spinner: NgxSpinnerService,
    private userManagerSer: UserManagerService
  ) {
    super(toast, spinner, userManagerSer);
    this.serviceURL = this.userManagerSer.serviceUrl;
    // this.getUserLevels();
    // this.getBranches();
  }

  ngOnInit() {
    super.init();
  }

  onSearch() {
    super.resetDataTable();
    if (this.searchUserName) {
      const userNameFilter: FilterPojo = new FilterPojo();
      userNameFilter.fieldName = 'userName';
      userNameFilter.filter = this.searchUserName;
      userNameFilter.type = '1';
      this.searchingObject.filtersList.push(userNameFilter);
    }
    if (this.searchFirstName) {
      const firstNameFilter: FilterPojo = new FilterPojo();
      firstNameFilter.fieldName = 'firstName';
      firstNameFilter.filter = this.searchFirstName;
      firstNameFilter.type = '1';
      this.searchingObject.filtersList.push(firstNameFilter);
    }
    if (this.searchLastName) {
      const lastNameFilter: FilterPojo = new FilterPojo();
      lastNameFilter.fieldName = 'lastName';
      lastNameFilter.filter = this.searchLastName;
      lastNameFilter.type = '1';
      this.searchingObject.filtersList.push(lastNameFilter);
    }

    if (this.searchActive && this.searchActive + '' !== 'All') {
      const activeFilter: FilterPojo = new FilterPojo();
      activeFilter.fieldName = 'active';
      activeFilter.filter = '' + this.searchActive;
      activeFilter.type = '2';
      this.searchingObject.filtersList.push(activeFilter);
    }

    // if (this.searchCabinet) {
    //   if (this.searchCabinet && this.searchCabinet + '' !== 'All') {
    //     const cabinetFilter: FilterPojo = new FilterPojo();
    //     cabinetFilter.fieldName = 'branchNo';
    //     cabinetFilter.filter = this.searchCabinet;
    //     cabinetFilter.type = '1';
    //     this.searchingObject.filtersList.push(cabinetFilter);
    //   }
    // }

    // if (this.searchJobDescription) {
    //   const jobDescriptionFilter: FilterPojo = new FilterPojo();
    //   jobDescriptionFilter.fieldName = 'jobDescription';
    //   jobDescriptionFilter.filter = this.searchJobDescription;
    //   jobDescriptionFilter.type = '1';
    //   this.searchingObject.filtersList.push(jobDescriptionFilter);
    // }
    // if (this.searchUserLevel && this.searchUserLevel + '' !== 'All') {
    //   const userLevelFilter: FilterPojo = new FilterPojo();
    //   userLevelFilter.fieldName = 'userLevelId';
    //   userLevelFilter.filter = '' + this.searchUserLevel;
    //   userLevelFilter.type = '2';
    //   this.searchingObject.filtersList.push(userLevelFilter);
    // }

    // if (this.searchBranch) {
    //   if (this.searchBranch && this.searchBranch + '' !== 'All') {
    //     const branchFilter: FilterPojo = new FilterPojo();
    //     branchFilter.fieldName = 'branchNo';
    //     branchFilter.filter = this.searchBranch;
    //     branchFilter.type = '1';
    //     this.searchingObject.filtersList.push(branchFilter);
    //   }
    // }

    super.onSearch();
  }

  onAddItem() {
    super.onAddItem(new UserModel());
  }

  // private getUserLevels() {
  //   this.userManagerSer.retrieveUserLevels().subscribe(
  //     (data: any) => {
  //       this.userLevels = this.handleSuccess(data);
  //     },
  //     (error: any) => {
  //       this.handleFailure(error);
  //     }
  //   );
  // }

  // private getBranches() {
  //   this.branchSer.getAllBranches().subscribe(
  //     (data: any) => {
  //       this.branches = super.handleSuccess(data);
  //     },
  //     (error: any) => {
  //       this.branches = [];
  //       super.handleFailure(error);
  //     }
  //   );
  // }
}
