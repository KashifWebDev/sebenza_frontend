import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAllInvoicesComponent } from './admin-all-invoices/admin-all-invoices.component';
import { AdminSingleInvoiceComponent } from './admin-single-invoice/admin-single-invoice.component';



@NgModule({
  declarations: [
    AdminAllInvoicesComponent,
    AdminSingleInvoiceComponent
  ],
  imports: [
    CommonModule
  ]
})
export class InvoiceModule { }
