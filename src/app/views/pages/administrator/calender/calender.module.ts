import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewAdminCalenderComponent } from './view-admin-calender/view-admin-calender.component';
import { AddAdminCalenderComponent } from './add-admin-calender/add-admin-calender.component';



@NgModule({
  declarations: [
    ViewAdminCalenderComponent,
    AddAdminCalenderComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CalenderModule { }
