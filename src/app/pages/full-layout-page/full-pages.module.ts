import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { FullPagesRoutingModule } from './full-pages-routing.module';
import { CalendarModule } from 'primeng/calendar';
import { ReportService } from 'src/app/shared/services/report/report.service';

import { AuthorityService } from '../../shared/services/master-data/authority.service';
//import {CustomFormsModule} from 'ng2-validation';
import { AccessDeniedComponent } from './access-denied/access-denied.component';

import { ToastrService } from 'ngx-toastr';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ngx-ui-switch';
import { NgbModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
//import {MultiSelectModule} from 'primeng/multiselect';
//import {DropdownModule} from 'primeng/dropdown';
import { AccordionModule } from 'primeng/accordion';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatDatepickerModule,
  MatMomentDateModule,
} from '@coachcare/datepicker';
//import {FormControl} from '@angular/forms';
import { TranslocoRootModule } from 'src/app/transloco-root.module';
import { UserListComponent } from './user-hier/user-list/user-list.component';
import { BranchListComponent } from './branch/branch.component';
import { ItemListComponent } from './item/item.component';
import { UserManagerService } from 'src/app/shared/services/master-data/user-manager.service';
import { ItemService } from 'src/app/shared/services/master-data/item.service';
import { BranchService } from 'src/app/shared/services/master-data/branch.service';
import { UserComponent } from './user-hier/user/user.component';
import { BaseHttpCrudService } from 'src/app/shared/services/base/base-http-crud.service';
import { CustomFormsModule } from 'ng2-validation';
import { MultiSelectModule } from 'primeng/multiselect';
import { CustomerListComponent } from './customer/customer.component';
import { CustomerService } from 'src/app/shared/services/master-data/customer.service';
import { CabinetService } from 'src/app/shared/services/master-data/cabinet.service';
import { CabinetListComponent } from './cabinet/cabinet.component';
import { OrderReceiptDetailsComponent } from './order-receipt/order-details/order-receipt-details.component';
import { StkTransactionService } from 'src/app/shared/services/order/order.service';
import { OrderReceiptHeaderComponent } from './order-receipt/order-header/order-receipt-header.component';
import { OrderIssueHeaderComponent } from './order-issue/order-header/order-issue-header.component';
import { OrderIssueDetailsComponent } from './order-issue/order-details/order-issue-details.component';
import { UserHierComponent } from './reports/user-hier/user-hier.component';
import { BaseReportComponent } from './reports/base-report/base-report.component';
import { StkTransDetailsComponent } from './reports/stk-trans-details/stk-trans-details.component';

@NgModule({
  imports: [
    TranslocoRootModule,
    CustomFormsModule,
    CommonModule,
    FullPagesRoutingModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    UiSwitchModule,
    NgbModule,
    CalendarModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatMomentDateModule,
    NgbDropdownModule,
    MultiSelectModule,
    AccordionModule,
    //FormControl
    //BrowserAnimationsModule
  ],
  declarations: [
    AccessDeniedComponent,
    BaseReportComponent,
    UserListComponent,
    UserComponent,
    UserHierComponent,
    BranchListComponent,
    ItemListComponent,
    CustomerListComponent,
    CabinetListComponent,
    OrderReceiptHeaderComponent,
    OrderReceiptDetailsComponent,
    OrderIssueHeaderComponent,
    OrderIssueDetailsComponent,
    StkTransDetailsComponent,
  ],
  providers: [
    BaseHttpCrudService,
    ToastrService,
    AuthorityService,
    ReportService,
    UserManagerService,
    ItemService,
    BranchService,
    CustomerService,
    CabinetService,
    StkTransactionService,
  ],
})
export class FullPagesModule {}
