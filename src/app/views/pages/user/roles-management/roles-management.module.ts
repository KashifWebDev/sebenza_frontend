import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ListAllRolesComponent} from "./list-all-roles/list-all-roles.component";
import {SharedModule} from "../../../shared/shared.module";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {FormsModule} from "@angular/forms";

const routes: Routes = [
  {path: '', component: ListAllRolesComponent},
]

@NgModule({
  declarations: [
    ListAllRolesComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    NgxDatatableModule,
    FormsModule
  ]
})
export class RolesManagementModule { }
