import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { WithdrawSalaryComponent } from './withdraw-salary/withdraw-salary.component';
import { ViewSalaryComponent } from './view-salary/view-salary.component';
import {SharedModule} from "../../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import { SingleWithdrawComponent } from './single-withdraw/single-withdraw.component';
import { MakeWithdrawComponent } from './make-withdraw/make-withdraw.component';

const routes: Routes = [
  {path: '', component: ViewSalaryComponent},
  {path: 'withdraw', component: WithdrawSalaryComponent},
  {path: 'withdraw/:id', component: SingleWithdrawComponent},
  {path: 'make-withdraw', component: MakeWithdrawComponent},
]

@NgModule({
  declarations: [
    WithdrawSalaryComponent,
    ViewSalaryComponent,
    SingleWithdrawComponent,
    MakeWithdrawComponent
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
export class SalaryWithdrawModule { }
