import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAllOrdersComponent } from './admin-all-orders/admin-all-orders.component';
import { AdminSingleOrderComponent } from './admin-single-order/admin-single-order.component';



@NgModule({
  declarations: [
    AdminAllOrdersComponent,
    AdminSingleOrderComponent
  ],
  imports: [
    CommonModule
  ]
})
export class OrdersModule { }
