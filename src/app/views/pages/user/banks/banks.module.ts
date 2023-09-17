import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyBanksComponent } from './my-banks/my-banks.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../../shared/shared.module";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


const routes: Routes = [
  {path: '', component: MyBanksComponent},
]

@NgModule({
  declarations: [
    MyBanksComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BanksModule { }
