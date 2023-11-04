import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCustomersComponent } from './user-customers/user-customers.component';
import { UserProjectsComponent } from './user-projects/user-projects.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {SharedModule} from "../../../shared/shared.module";

const routes: Routes = [
  {path: '', component: UserProjectsComponent},
  {path: 'customers', component: UserCustomersComponent},
]

@NgModule({
  declarations: [
    UserCustomersComponent,
    UserProjectsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class UserProjectsModule { }
