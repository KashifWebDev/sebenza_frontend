import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListAllUsersComponent } from './list-all-users/list-all-users.component';
import { AddUserComponent } from './add-user/add-user.component';
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
    ListAllUsersComponent,
    AddUserComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        ReactiveFormsModule,
        NgxDatatableModule,
        FormsModule
    ]
})
export class UsersManagementModule { }
