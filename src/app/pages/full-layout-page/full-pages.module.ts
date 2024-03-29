import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { FullPagesRoutingModule } from './full-pages-routing.module';
import { CalendarModule } from 'primeng/calendar';

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
import { ItemListComponent } from './item/item.component';
import { UserManagerService } from 'src/app/shared/services/master-data/user-manager.service';
import { ItemService } from 'src/app/shared/services/master-data/item.service';
import { UserComponent } from './user-hier/user/user.component';
import { BaseHttpCrudService } from 'src/app/shared/services/base/base-http-crud.service';
import { CustomFormsModule } from 'ng2-validation';
import { MultiSelectModule } from 'primeng/multiselect';
import { CustomerListComponent } from './customer/customer.component';
import { CustomerService } from 'src/app/shared/services/master-data/customer.service';
import { CabinetService } from 'src/app/shared/services/master-data/cabinet.service';
import { CabinetListComponent } from './cabinet/cabinet.component';
import { StkTransactionService } from 'src/app/shared/services/order/order.service';
import { StkTransHeaderComponent } from './stk-transactions/stk-trans-header/stk-trans-header.component';
import { ButtonModule, CardModule, DataView, DataViewModule, TableModule } from 'primeng';
import { SelectCabinetComponent } from './select-cabinet/select-cabinet.component';

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
    TableModule,
    ButtonModule,
    DataViewModule,
    CardModule,
    //FormControl
    //BrowserAnimationsModule
  ],
  declarations: [
    AccessDeniedComponent,
    UserListComponent,
    UserComponent,
    ItemListComponent,
    CustomerListComponent,
    CabinetListComponent,
    StkTransHeaderComponent,
    SelectCabinetComponent,
  ],
  providers: [
    BaseHttpCrudService,
    ToastrService,
    AuthorityService,
    UserManagerService,
    ItemService,
    CustomerService,
    CabinetService,
    StkTransactionService,
  ],
})
export class FullPagesModule {}
