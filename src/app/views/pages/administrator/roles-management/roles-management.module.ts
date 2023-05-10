import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import {ListAllRolesComponent} from "./list-all-roles/list-all-roles.component";
import { AddNewRoleComponent } from './add-new-role/add-new-role.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../../shared/shared.module";
import {NgSelectModule} from "@ng-select/ng-select";
import {ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  {path: '', component: ListAllRolesComponent},
  {path: 'add-role', component: AddNewRoleComponent},
]

@NgModule({
  declarations: [
    ListAllRolesComponent,
    AddNewRoleComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgSelectModule,
    ReactiveFormsModule
  ]
})
export class RolesManagementModule { }
