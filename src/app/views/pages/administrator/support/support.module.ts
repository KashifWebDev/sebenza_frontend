import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhatsappComponent } from './whatsapp/whatsapp.component';
import {RouterModule, Routes} from "@angular/router";
import { AddWhatsappComponent } from './add-whatsapp/add-whatsapp.component';
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared/shared.module";
import {AllTicketsComponent} from "./all-tickets/all-tickets.component";
import {NgbNavModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";

const routes: Routes = [
  {path: '', redirectTo: 'tickets', pathMatch: 'full'},
  {path: 'tickets', component: AllTicketsComponent},
  {path: 'whatsapp', component: WhatsappComponent},
  {path: 'whatsapp/add', component: AddWhatsappComponent},
]

@NgModule({
  declarations: [
    WhatsappComponent,
    AddWhatsappComponent,
    AllTicketsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NgxDatatableModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    PerfectScrollbarModule,
    NgbNavModule
  ]
})
export class SupportModule { }
