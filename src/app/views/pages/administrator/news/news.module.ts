import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewsComponent } from './add-news/add-news.component';
import { ListAllNewsComponent } from './list-all-news/list-all-news.component';
import {RouterModule, Routes} from "@angular/router";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared/shared.module";

const routes: Routes = [
  {path: '', component: ListAllNewsComponent},
  {path: 'add-news', component: AddNewsComponent},
]


@NgModule({
  declarations: [
    AddNewsComponent,
    ListAllNewsComponent
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
export class NewsModule { }
