import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ViewUserCalenderComponent } from './view-user-calender/view-user-calender.component';
import { AddUserCalenderComponent } from './add-user-calender/add-user-calender.component';
import {RouterModule, Routes} from "@angular/router";
import {FullCalendarModule} from "@fullcalendar/angular";
import {NgbDatepickerModule, NgbTimepickerModule} from "@ng-bootstrap/ng-bootstrap";
import {SharedModule} from "../../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ColorPickerModule} from "ngx-color-picker";




const routes: Routes = [
  {path: '', component: ViewUserCalenderComponent},
  {path: 'new', component: AddUserCalenderComponent}
]

@NgModule({
  declarations: [
    ViewUserCalenderComponent,
    AddUserCalenderComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FullCalendarModule,
        NgbTimepickerModule,
        SharedModule,
        ReactiveFormsModule,
        NgbDatepickerModule,
        ColorPickerModule
    ],
  providers: [
    DatePipe
  ]
})
export class CalenderModule { }
