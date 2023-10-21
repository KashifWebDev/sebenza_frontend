import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import {RouterModule, Routes} from "@angular/router";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared/shared.module";

const routes: Routes = [
  {path: '', redirectTo: 'products', pathMatch: 'full'},
  {path: 'products', component: ProductsComponent}
]

@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ]
})
export class StockModule { }
