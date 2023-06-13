import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTicketsComponent } from './user-tickets/user-tickets.component';
import { UserCreateTicketComponent } from './user-create-ticket/user-create-ticket.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../../shared/shared.module";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UserViewTicketComponent } from './user-view-ticket/user-view-ticket.component';
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";


const routes: Routes = [
  {path: '', redirectTo: 'tickets', pathMatch: 'full'},
  {
    path: 'tickets',
    children: [
      {path: '', component: UserTicketsComponent,},
      {path: ':id', component: UserViewTicketComponent}
    ]
  },
  {path: 'ticket/new', component: UserCreateTicketComponent}
]

@NgModule({
  declarations: [
    UserTicketsComponent,
    UserCreateTicketComponent,
    UserViewTicketComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    NgbTooltipModule
  ]
})
export class SupportModule { }
