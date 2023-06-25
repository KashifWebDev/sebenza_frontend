import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateMeetingComponent } from './create-meeting/create-meeting.component';
import { AllMeetingsComponent } from './all-meetings/all-meetings.component';
import {RouterModule, Routes} from "@angular/router";
import { ViewMeetingComponent } from './view-meeting/view-meeting.component';
import {SharedModule} from "../../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbDatepickerModule, NgbTimepickerModule} from "@ng-bootstrap/ng-bootstrap";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";

const routes: Routes = [
  {path: '', component: AllMeetingsComponent},
  {path: 'view/:id', component: ViewMeetingComponent},
  {path: 'new', component: CreateMeetingComponent}
]

@NgModule({
  declarations: [
    CreateMeetingComponent,
    AllMeetingsComponent,
    ViewMeetingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    FormsModule,
    NgxDatatableModule
  ]
})
export class MeetingModule { }
