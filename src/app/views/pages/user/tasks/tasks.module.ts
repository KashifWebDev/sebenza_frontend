import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTaskComponent } from './add-task/add-task.component';
import { AllTasksComponent } from './all-tasks/all-tasks.component';
import { ViewTasksComponent } from './view-tasks/view-tasks.component';
import {NgbDatepickerModule, NgbTimepickerModule} from "@ng-bootstrap/ng-bootstrap";
import {SharedModule} from "../../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";

const routes: Routes = [
  {path: '', component: AllTasksComponent},
  {path: 'view/:id', component: ViewTasksComponent},
  {path: 'new', component: AddTaskComponent}
]

@NgModule({
  declarations: [
    AddTaskComponent,
    AllTasksComponent,
    ViewTasksComponent
  ],
  imports: [
    CommonModule,
    NgbTimepickerModule,
    SharedModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
    FormsModule,
  ]
})
export class TasksModule { }
