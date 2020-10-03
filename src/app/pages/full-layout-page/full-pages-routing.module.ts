import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { UserListComponent } from './user-hier/user-list/user-list.component';
import { AuthoritiesGuardService } from 'src/app/shared/services/auth/authorities-guard.service';
import { ItemListComponent } from './item/item.component';
import { BranchListComponent } from './branch/branch.component';
import { CustomerListComponent } from './customer/customer.component';
import { CabinetListComponent } from './cabinet/cabinet.component';
import { UserComponent } from './user-hier/user/user.component';
import { OrderReceiptDetailsComponent } from './order-receipt/order-details/order-receipt-details.component';
import { OrderReceiptHeaderComponent } from './order-receipt/order-header/order-receipt-header.component';
import { OrderIssueHeaderComponent } from './order-issue/order-header/order-issue-header.component';
import { OrderIssueDetailsComponent } from './order-issue/order-details/order-issue-details.component';
import { StkTransHeaderComponent } from './stk-transactions/stk-trans-header/stk-trans-header.component';

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
    path: 'user-list',
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
    path: 'stk-trans-receipt',
    component: OrderReceiptHeaderComponent,
    canActivate: [AuthoritiesGuardService],
    data: {
      title: 'STK Receipt',
    },
  },
  {
    path: 'order-receipt-details/:transno',
    component: OrderReceiptDetailsComponent,
    canActivate: [AuthoritiesGuardService],
    data: {
      title: 'STK Receipt Details',
    },
  },
  {
    path: 'stk-trans-issue',
    component: OrderIssueHeaderComponent,
    canActivate: [AuthoritiesGuardService],
    data: {
      title: 'STK Issue',
    },
  },
  {
    path: 'order-issue-details/:transno',
    component: OrderIssueDetailsComponent,
    canActivate: [AuthoritiesGuardService],
    data: {
      title: 'STK Issue Details',
    },
  },
  {
    path: 'stk-trans-header',
    component: StkTransHeaderComponent,
    canActivate: [AuthoritiesGuardService],
    data: {
      title: 'Stock Transactions',
    },
  },
  // {
  //   path: 'reports',
  //   component: BaseReportComponent,
  //   canActivate: [AuthoritiesGuardService],
  //   data: {
  //     title: 'Report',
  //   },
  // },
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
