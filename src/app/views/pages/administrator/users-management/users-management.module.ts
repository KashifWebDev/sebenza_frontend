import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListAllUsersComponent } from './list-all-users/list-all-users.component';
import { AddUserComponent } from './add-user/add-user.component';
import {RouterModule, Routes} from "@angular/router";


const routes: Routes = [
  {path: '', component: ListAllUsersComponent},
  {path: 'add-user', component: AddUserComponent},
]

@NgModule({
  declarations: [
    ListAllUsersComponent,
    AddUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UsersManagementModule { }
