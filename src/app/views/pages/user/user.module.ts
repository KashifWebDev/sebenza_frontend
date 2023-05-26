import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import {DashboardComponent} from "../administrator/dashboard/dashboard.component";

const routes: Routes = [
  {path: '',redirectTo: 'home',pathMatch: 'full'},
  {path: 'home',component: DashboardComponent},
  {path: 'news',loadChildren: () => import('./news/userNews.module').then(m => m.UserNewsModule)}
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
