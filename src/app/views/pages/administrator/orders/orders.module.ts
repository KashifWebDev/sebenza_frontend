import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAllOrdersComponent } from './admin-all-orders/admin-all-orders.component';
import { AdminSingleOrderComponent } from './admin-single-order/admin-single-order.component';
import {SharedModule} from "../../../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {FormsModule} from "@angular/forms";

const routes: Routes = [
  {path: '', component: AdminAllOrdersComponent},
  {path: 'view/:id', component: AdminSingleOrderComponent}
]

@NgModule({
  declarations: [
    AdminAllOrdersComponent,
    AdminSingleOrderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
    FormsModule,
  ]
})
export class OrdersModule { }
