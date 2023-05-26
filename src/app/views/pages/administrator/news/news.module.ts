import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewsComponent } from './add-news/add-news.component';
import { ListAllNewsComponent } from './list-all-news/list-all-news.component';
import {RouterModule, Routes} from "@angular/router";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared/shared.module";
import {QuillModule} from "ngx-quill";
import { SingleNewsComponent } from './single-news/single-news.component';

const routes: Routes = [
  {path: '', component: ListAllNewsComponent},
  {path: 'add-news', component: AddNewsComponent},
  {path: ':id', component: SingleNewsComponent},
]


@NgModule({
  declarations: [
    AddNewsComponent,
    ListAllNewsComponent,
    SingleNewsComponent
  ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        NgxDatatableModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        QuillModule
    ]
})
export class NewsModule { }
