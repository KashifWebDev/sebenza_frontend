import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAllInvoicesComponent } from './admin-all-invoices/admin-all-invoices.component';
import { AdminSingleInvoiceComponent } from './admin-single-invoice/admin-single-invoice.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";

const routes: Routes = [
  {path: '', component: AdminAllInvoicesComponent},
  {path: ':id', component: AdminSingleInvoiceComponent},
]

@NgModule({
  declarations: [
    AdminAllInvoicesComponent,
    AdminSingleInvoiceComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    FormsModule,
    NgxDatatableModule
  ]
})
export class InvoiceModule { }
