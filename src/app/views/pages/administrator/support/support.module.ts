import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhatsappComponent } from './whatsapp/whatsapp.component';
import {RouterModule, Routes} from "@angular/router";
import { AddWhatsappComponent } from './add-whatsapp/add-whatsapp.component';
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared/shared.module";

const routes: Routes = [
  {path: 'whatsapp', component: WhatsappComponent},
  {path: 'whatsapp/add', component: AddWhatsappComponent},
]

@NgModule({
  declarations: [
    WhatsappComponent,
    AddWhatsappComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NgxDatatableModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class SupportModule { }
