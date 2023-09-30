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
import {NgSelectModule} from "@ng-select/ng-select";
import { WithdrawRequestsComponent } from './withdraw-requests/withdraw-requests.component';
import { WithdrawRequestSingleComponent } from './withdraw-request-single/withdraw-request-single.component';
import { VatComponent } from './vat/vat.component';
import { TermsConditionsListingComponent } from './terms-conditions-listing/terms-conditions-listing.component';
import { TermsCategoryComponent } from './terms-category/terms-category.component';
import { AddNewTermConditionComponent } from './add-new-term-condition/add-new-term-condition.component';

const routes: Routes = [
  {path: '', redirectTo: 'pay-frequency'},
  {path: 'pay-frequency', component: PayFrequencyComponent},
  {path: 'salaries', component: SalariesComponent},
  {path: 'salaries/new', component: AddSalaryComponent},
  {path: 'salary/:id', component: ViewSingleSalaryComponent},
  {path: 'withdraw-requests', component: WithdrawRequestsComponent},
  {path: 'withdraw-requests/:id', component: WithdrawRequestSingleComponent},
  {path: 'vat', component: VatComponent},
  {path: 'add-new-term', component: AddNewTermConditionComponent},
  {path: 'terms-categories', component: TermsCategoryComponent},
  {path: 'term-conditions', component: TermsConditionsListingComponent},
]

@NgModule({
  declarations: [
    PayFrequencyComponent,
    SalariesComponent,
    AddSalaryComponent,
    ViewSingleSalaryComponent,
    WithdrawRequestsComponent,
    WithdrawRequestSingleComponent,
    VatComponent,
    TermsConditionsListingComponent,
    TermsCategoryComponent,
    AddNewTermConditionComponent
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
