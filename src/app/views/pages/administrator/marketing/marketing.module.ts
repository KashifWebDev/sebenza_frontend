import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AllPromocodesComponent} from "./promocodes/all-promocodes/all-promocodes.component";
import {AddPromocodeComponent} from "./promocodes/add-promocode/add-promocode.component";
import {SharedModule} from "../../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";

const routes: Routes = [
  {path: '', redirectTo: 'promocodes', pathMatch: 'full'},
  {path: 'promocodes', children: [
      {path: '', component: AllPromocodesComponent},
      {path: 'add', component: AddPromocodeComponent},
    ]
  }
];

@NgModule({
  declarations: [
    AddPromocodeComponent,
    AllPromocodesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    NgxDatatableModule,
    ReactiveFormsModule
  ]
})
export class MarketingModule { }
