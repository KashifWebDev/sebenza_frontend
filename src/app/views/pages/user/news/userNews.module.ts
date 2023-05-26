import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListNewsComponent } from './user-list-news/user-list-news.component';
import {RouterModule, Routes} from "@angular/router";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared/shared.module";
import { UserSingleNewsComponent } from './user-single-news/user-single-news.component';

const routes: Routes = [
  {path: '', redirectTo: 'all-news', pathMatch: 'full'},
  {path: 'all-news', component: UserListNewsComponent},
  {path: ':id', component: UserSingleNewsComponent},
]

@NgModule({
  declarations: [
    UserListNewsComponent,
    UserSingleNewsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NgxDatatableModule,
    FormsModule,
    SharedModule
  ]
})

export class UserNewsModule { }
