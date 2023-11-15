import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPosComponent } from './list-pos/list-pos.component';
import { AddPosComponent } from './add-pos/add-pos.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared/shared.module";
import {ColorPickerModule} from "ngx-color-picker";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";


const routes: Routes = [
  {path: '', component: ListPosComponent},
  {path: 'add', component: AddPosComponent}
]

@NgModule({
  declarations: [
    ListPosComponent,
    AddPosComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ColorPickerModule,
    NgxDatatableModule
  ]
})
export class PosModule { }
