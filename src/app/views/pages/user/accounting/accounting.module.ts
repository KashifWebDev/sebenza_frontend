import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingRecordsComponent } from './meeting-records/meeting-records.component';
import {RouterModule, Routes} from "@angular/router";
import { TasksRecordsComponent } from './tasks-records/tasks-records.component';
import { WithdrawsRecordsComponent } from './withdraws-records/withdraws-records.component';
import { ExpensesRecordsComponent } from './expenses-records/expenses-records.component';
import { EstimatesRecordsComponent } from './estimates-records/estimates-records.component';
import { ProductsRecordsComponent } from './products-records/products-records.component';
import { StocksRecordsComponent } from './stocks-records/stocks-records.component';
import { CustomersRecordsComponent } from './customers-records/customers-records.component';
import { ProjectsRecordsComponent } from './projects-records/projects-records.component';
import { SalesRecordsComponent } from './sales-records/sales-records.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {SharedModule} from "../../../shared/shared.module";
import {NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";

const routes: Routes = [
  {path: 'meeting', component: MeetingRecordsComponent},
  {path: 'tasks', component: TasksRecordsComponent},
  {path: 'withdraws', component: WithdrawsRecordsComponent},
  {path: 'expenses', component: ExpensesRecordsComponent},
  {path: 'estimates', component: EstimatesRecordsComponent},
  {path: 'products', component: ProductsRecordsComponent},
  {path: 'stocks', component: StocksRecordsComponent},
  {path: 'customers', component: CustomersRecordsComponent},
  {path: 'projects', component: ProjectsRecordsComponent},
  {path: 'sales', component: SalesRecordsComponent},
]

@NgModule({
  declarations: [
    MeetingRecordsComponent,
    TasksRecordsComponent,
    WithdrawsRecordsComponent,
    ExpensesRecordsComponent,
    EstimatesRecordsComponent,
    ProductsRecordsComponent,
    StocksRecordsComponent,
    CustomersRecordsComponent,
    ProjectsRecordsComponent,
    SalesRecordsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    NgxDatatableModule,
    SharedModule,
    NgbDatepickerModule,
    ReactiveFormsModule
  ]
})
export class AccountingModule { }
