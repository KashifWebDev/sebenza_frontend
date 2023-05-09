import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import {ListAllRolesComponent} from "./list-all-roles/list-all-roles.component";
import { AddNewRoleComponent } from './add-new-role/add-new-role.component';
import {RouterModule, Routes} from "@angular/router";

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
    RouterModule.forChild(routes)
  ]
})
export class RolesManagementModule { }
