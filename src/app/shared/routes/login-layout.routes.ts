import { Routes, RouterModule } from '@angular/router';

//Route for content layout without sidebar, navbar and footer for pages like Login, Registration etc...

export const LOGIN_ROUTES: Routes = [
    {
        path: '',
        loadChildren: () => import('src/app/pages/login-layout-page/login-pages.module').then(m => m.LoginPagesModule)
        //loadChildren: './pages/login-layout-page/login-pages.module#LoginPagesModule'
    }
];