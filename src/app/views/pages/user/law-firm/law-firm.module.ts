import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewCaseComponent } from './add-new-case/add-new-case.component';
import { ListCasesComponent } from './list-cases/list-cases.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";
import {QuillModule} from "ngx-quill";
import {SharedModule} from "../../../shared/shared.module";
import {ColorPickerModule} from "ngx-color-picker";
import { ViewCaseComponent } from './view-case/view-case.component';
import {ViewEstimateComponent} from "../estimate-quotes/view-estimate/view-estimate.component";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";

const routes: Routes = [
  {path: '', redirectTo: 'cases'},
  {path: 'cases', component: ListCasesComponent},
  {path: 'new', component: AddNewCaseComponent},
  {path: 'view/:id', component: ViewCaseComponent},
]

@NgModule({
  declarations: [
    AddNewCaseComponent,
    ListCasesComponent,
    ViewCaseComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    NgSelectModule,
    NgbDatepickerModule,
    QuillModule,
    ReactiveFormsModule,
    SharedModule,
    ColorPickerModule,
    NgxDatatableModule
  ]
})
export class LawFirmModule { }
