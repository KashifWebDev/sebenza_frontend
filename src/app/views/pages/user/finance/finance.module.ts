import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatementComponent } from './statement/statement.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import {RouterModule, Routes} from "@angular/router";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared/shared.module";
import { ExpenseTypesComponent } from './expense-types/expense-types.component';
import { SingleExpenseComponent } from './single-expense/single-expense.component';

const routes: Routes = [
  {path: '', component: StatementComponent},
  {path: 'new', component: AddExpenseComponent},
  {path: 'types', component: ExpenseTypesComponent},
  {path: 'expense/:id', component: SingleExpenseComponent}
]

@NgModule({
  declarations: [
    StatementComponent,
    AddExpenseComponent,
    ExpenseTypesComponent,
    SingleExpenseComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NgxDatatableModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class FinanceModule { }
