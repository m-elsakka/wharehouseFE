
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginLayoutComponent } from './layouts/login/login-layout.component';
import { TokenInterceptor } from './shared/services/auth/token.interceptor';
import { ToastService } from './shared/services/uitls/toast.service';

import { SharedModule } from './shared/shared.module';
import { FullLayoutComponent } from './layouts/full/full-layout.component';

import {MatInputModule} from '@angular/material/input';
import { MatDatepickerModule, MatMomentDateModule } from '@coachcare/datepicker';
import { FormsModule } from "@angular/forms";
import { CalendarModule } from "primeng/calendar";
import { TranslocoRootModule } from './transloco-root.module';
import { TranslocoHttpLoader } from "./transloco-root.module";


import {
    TRANSLOCO_CONFIG,
    TranslocoConfig,
    TranslocoModule
  } from "@ngneat/transloco";



@NgModule({
    declarations: [
        AppComponent,
        FullLayoutComponent,
        LoginLayoutComponent
    ],
    imports: [
        TranslocoModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        SharedModule,
        NgbModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        NgxSpinnerModule,
        NgbModule,
        MatInputModule,
        MatDatepickerModule,
        MatMomentDateModule ,
        FormsModule,
        CalendarModule,
        TranslocoRootModule
    ],
    providers: [
        TranslocoHttpLoader,
        {
          provide: TRANSLOCO_CONFIG,
          useValue: {
            availableLangs: ["en", "fr"],
            reRenderOnLangChange: true,
            fallbackLang: "fr",
            defaultLang: "en"
          } as TranslocoConfig
        },
        HttpClient,
        ToastService,
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
