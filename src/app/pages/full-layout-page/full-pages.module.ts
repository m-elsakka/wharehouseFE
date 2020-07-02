import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { FullPagesRoutingModule } from './full-pages-routing.module';
import { CalendarModule } from 'primeng/calendar';
import { ReportService } from "src/app/shared/services/report/report.service";


import { AuthorityService } from '../../shared/services/master-data/authority.service';
//import {CustomFormsModule} from 'ng2-validation';
import { AccessDeniedComponent } from './access-denied/access-denied.component';

import { ToastrService } from 'ngx-toastr';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ngx-ui-switch';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import {MultiSelectModule} from 'primeng/multiselect';
//import {DropdownModule} from 'primeng/dropdown';
import { AccordionModule } from 'primeng/accordion';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MatDatepickerModule, MatMomentDateModule } from '@coachcare/datepicker';
//import {FormControl} from '@angular/forms';
import { TranslocoRootModule } from 'src/app/transloco-root.module';


@NgModule({
  imports: [
    TranslocoRootModule,
    // CustomFormsModule ,
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
    //   DropdownModule,
    //   MultiSelectModule,
    AccordionModule,
    //FormControl
    //BrowserAnimationsModule
  ],
  declarations: [
    AccessDeniedComponent
  ],
  providers: [ToastrService, AuthorityService, ReportService]
})
export class FullPagesModule {
}
