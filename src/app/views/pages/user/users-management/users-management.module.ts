import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './add-user/add-user.component';
import { ListAllUsersComponent } from './list-all-users/list-all-users.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";

const routes: Routes = [
  {path: '', component: ListAllUsersComponent},
  {path: 'add-user', component: AddUserComponent},
]

@NgModule({
  declarations: [
    AddUserComponent,
    ListAllUsersComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    FormsModule
  ]
})
export class UsersManagementModule { }
