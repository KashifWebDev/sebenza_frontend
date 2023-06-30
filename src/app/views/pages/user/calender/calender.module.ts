import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewUserCalenderComponent } from './view-user-calender/view-user-calender.component';
import { AddUserCalenderComponent } from './add-user-calender/add-user-calender.component';
import {RouterModule, Routes} from "@angular/router";
import {FullCalendarModule} from "@fullcalendar/angular";




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
    FullCalendarModule
  ]
})
export class CalenderModule { }
