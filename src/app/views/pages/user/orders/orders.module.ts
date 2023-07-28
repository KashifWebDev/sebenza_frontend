import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersAllOrdersComponent } from './users-all-orders/users-all-orders.component';
import { UsersCreateOrdersComponent } from './users-create-orders/users-create-orders.component';
import { UsersSingleOrderComponent } from './users-single-order/users-single-order.component';
import {RouterModule, Routes} from "@angular/router";


const routes: Routes = [
  {path: '', component: UsersAllOrdersComponent},
  {path: 'new', component: UsersCreateOrdersComponent},
  {path: 'view/:id', component: UsersSingleOrderComponent}
]

@NgModule({
  declarations: [
    UsersAllOrdersComponent,
    UsersCreateOrdersComponent,
    UsersSingleOrderComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class OrdersModule { }
