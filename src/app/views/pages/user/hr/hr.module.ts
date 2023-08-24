import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayFrequencyComponent } from './pay-frequency/pay-frequency.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SalariesComponent } from './salaries/salaries.component';
import { AddSalaryComponent } from './add-salary/add-salary.component';
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import { ViewSingleSalaryComponent } from './view-single-salary/view-single-salary.component';
import { EditSalaryComponent } from './edit-salary/edit-salary.component';
import {NgSelectModule} from "@ng-select/ng-select";

const routes: Routes = [
  {path: '', redirectTo: 'pay-frequency'},
  {path: 'pay-frequency', component: PayFrequencyComponent},
  {path: 'salaries', component: SalariesComponent},
  {path: 'salaries/new', component: AddSalaryComponent},
]

@NgModule({
  declarations: [
    PayFrequencyComponent,
    SalariesComponent,
    AddSalaryComponent,
    ViewSingleSalaryComponent,
    EditSalaryComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    FormsModule,
    NgSelectModule
  ]
})
export class HrModule { }
