import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { UserListComponent } from './user-hier/user-list/user-list.component';
import { AuthoritiesGuardService } from 'src/app/shared/services/auth/authorities-guard.service';
import { ItemListComponent } from './item/item.component';
import { BranchListComponent } from './branch/branch.component';
import { CustomerListComponent } from './customer/customer.component';
import { CabinetListComponent } from './cabinet/cabinet.component';

const routes: Routes = [
  {
    path: 'cabinet',
    component: CabinetListComponent,
    canActivate: [AuthoritiesGuardService],
    data: {
      title: 'Cabinets',
    },
  },
  {
    path: 'branch',
    component: BranchListComponent,
    canActivate: [AuthoritiesGuardService],
    data: {
      title: 'Plants',
    },
  },
  {
    path: 'item',
    component: ItemListComponent,
    canActivate: [AuthoritiesGuardService],
    data: {
      title: 'Items',
    },
  },
  {
    path: 'user',
    component: UserListComponent,
    canActivate: [AuthoritiesGuardService],
    data: {
      title: 'Users',
    },
  },
  {
    path: 'customer',
    component: CustomerListComponent,
    canActivate: [AuthoritiesGuardService],
    data: {
      title: 'Customers',
    },
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent,
    data: {
      title: 'Access Denied',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullPagesRoutingModule {}
