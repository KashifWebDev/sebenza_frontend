import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAllInvoicesComponent } from './user-all-invoices/user-all-invoices.component';
import { UserSingleInvoiceComponent } from './user-single-invoice/user-single-invoice.component';
import {RouterModule, Routes} from "@angular/router";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {SharedModule} from "../../../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {FeatherIconModule} from "../../../../core/feather-icon/feather-icon.module";

const routes: Routes = [
  {path: '', component: UserAllInvoicesComponent},
  {path: ':id', component: UserSingleInvoiceComponent},
]

@NgModule({
  declarations: [
    UserAllInvoicesComponent,
    UserSingleInvoiceComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NgxDatatableModule,
    SharedModule,
    FormsModule,
    FeatherIconModule
  ]
})
export class InvoiceModule { }