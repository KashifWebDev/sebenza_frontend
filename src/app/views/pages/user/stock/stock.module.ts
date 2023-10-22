import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import {RouterModule, Routes} from "@angular/router";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared/shared.module";
import { AssetsComponent } from './assets/assets.component';
import { WarehouseComponent } from './warehouse/warehouse.component';

const routes: Routes = [
  {path: '', redirectTo: 'products', pathMatch: 'full'},
  {path: 'products', component: ProductsComponent},
  {path: 'assets', component: AssetsComponent},
  {path: 'warehouse', component: WarehouseComponent},
]

@NgModule({
  declarations: [
    ProductsComponent,
    AssetsComponent,
    WarehouseComponent
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
