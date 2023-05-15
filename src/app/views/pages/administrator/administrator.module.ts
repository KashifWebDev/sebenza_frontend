import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {FeatherIconModule} from "../../../core/feather-icon/feather-icon.module";
import {NgbDatepickerModule, NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {NgApexchartsModule} from "ng-apexcharts";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'users-management',
    loadChildren: () => import('./users-management/users-management.module').then(m => m.UsersManagementModule)
  },
  {
    path: 'roles-management',
    loadChildren: () => import('./roles-management/roles-management.module').then(m => m.RolesManagementModule)
  },
  {
    path: 'user-packages',
    loadChildren: () => import('./user-packages/user-packages.module').then(m => m.UserPackagesModule)
  },
  {
    path: 'account-types',
    loadChildren: () => import('./account-types/account-types.module').then(m => m.AccountTypesModule)
  }
]

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    FeatherIconModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgApexchartsModule
  ]
})
export class AdministratorModule { }
