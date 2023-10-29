import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import {RouterModule, Routes} from "@angular/router";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared/shared.module";
import { AssetsComponent } from './assets/assets.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { StockComponent } from './stock/stock.component';
import {NgSelectModule} from "@ng-select/ng-select";
import {NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";
import {QuillModule} from "ngx-quill";
import {ColorPickerModule} from "ngx-color-picker";

const routes: Routes = [
  {path: '', component: StockComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'assets', component: AssetsComponent},
  {path: 'warehouse', component: WarehouseComponent},
]

@NgModule({
  declarations: [
    ProductsComponent,
    AssetsComponent,
    WarehouseComponent,
    StockComponent
  ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        NgxDatatableModule,
        ReactiveFormsModule,
        SharedModule,
        FormsModule,
        NgSelectModule,
        NgbDatepickerModule,
        QuillModule,
        ColorPickerModule
    ]
})
export class StockModule { }
