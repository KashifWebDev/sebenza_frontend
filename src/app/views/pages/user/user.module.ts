import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import {DashboardComponent} from "../administrator/dashboard/dashboard.component";
import {UserProfileComponent} from "../../shared/user-profile/user-profile.component";

const routes: Routes = [
  {path: '',redirectTo: 'home',pathMatch: 'full'},
  {path: 'home',component: DashboardComponent},
  {path: 'profile',component: UserProfileComponent},
  {path: 'news',loadChildren: () => import('./news/userNews.module').then(m => m.UserNewsModule)},
  {path: 'support',loadChildren: () => import('./support/support.module').then(m => m.SupportModule)},
  {path: 'meeting',loadChildren: () => import('./meeting/meeting.module').then(m => m.MeetingModule)},
  {path: 'tasks',loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule)},
  {path: 'calendar',loadChildren: () => import('./calender/calender.module').then(m => m.CalenderModule)},
  {path: 'expenses',loadChildren: () => import('./finance/finance.module').then(m => m.FinanceModule)},
  {path: 'orders',loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)},
  {path: 'invoices',loadChildren: () => import('./invoice/invoice.module').then(m => m.InvoiceModule)},
  {path: 'invite-users',loadChildren: () => import('./invite-users/invite-users.module').then(m => m.InviteUsersModule)},
  {path: 'salary',loadChildren: () => import('./salary-withdraw/salary-withdraw.module').then(m => m.SalaryWithdrawModule)},
  {path: 'hr',loadChildren: () => import('./hr/hr.module').then(m => m.HrModule)},
]

@NgModule({
  declarations: [
    UserDashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class UserModule { }
