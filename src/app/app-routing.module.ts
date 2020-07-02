import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {LoginLayoutComponent} from './layouts/login/login-layout.component';
import {FullLayoutComponent} from './layouts/full/full-layout.component';
import {Full_ROUTES} from './shared/routes/full-layout.routes';

import {AuthGuard} from './shared/services/auth/auth-guard.service';
import {LOGIN_ROUTES} from './shared/routes/login-layout.routes';


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'full-layout',
    pathMatch: 'full',
  },
  {
    path: '', component: FullLayoutComponent,
    data: { title: 'full Views' }, children: Full_ROUTES, canActivate: [AuthGuard]
  },
  {
    path: '', component: LoginLayoutComponent,
    data: { title: 'content Views' }, children: LOGIN_ROUTES
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
    useHash: true,
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
