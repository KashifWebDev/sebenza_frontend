import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewCalenderComponent } from './view-calender/view-calender.component';
import { AddCalenderComponent } from './add-calender/add-calender.component';
import {PerfectScrollbarConfigInterface} from "ngx-perfect-scrollbar";

import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
])

@NgModule({
  declarations: [
    ViewCalenderComponent,
    AddCalenderComponent
  ],
  exports: [
    ViewCalenderComponent,
    AddCalenderComponent
  ],
  imports: [
    CommonModule,
    FullCalendarModule
  ]
})
export class SharedCalendarModule { }
