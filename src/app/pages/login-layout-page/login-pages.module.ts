import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { LoginPagesRoutingModule } from './login-pages-routing.module';



@NgModule({
    imports: [
        CommonModule,
        LoginPagesRoutingModule,
        FormsModule
    ],
    declarations: [
        LoginComponent
    ]
})
export class LoginPagesModule { }
