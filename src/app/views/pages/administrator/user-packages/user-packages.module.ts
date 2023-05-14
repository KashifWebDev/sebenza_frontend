import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListAllPackagesComponent } from './list-all-packages/list-all-packages.component';
import {RouterModule, Routes} from "@angular/router";
import { AddPackageComponent } from './add-package/add-package.component';
import {SharedModule} from "../../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";

const routes: Routes = [
  {path: '', component: ListAllPackagesComponent},
  {path: 'add-package', component: AddPackageComponent},
]

@NgModule({
  declarations: [
    ListAllPackagesComponent,
    AddPackageComponent
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
export class UserPackagesModule { }
