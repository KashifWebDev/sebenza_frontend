import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllAccountTypesComponent } from './all-account-types/all-account-types.component';
import { CreateNewAccountTypeComponent } from './create-new-account-type/create-new-account-type.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared/shared.module";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";

const routes: Routes = [
  {path: '', component: AllAccountTypesComponent},
  {path: 'add-account', component: CreateNewAccountTypeComponent},
]

@NgModule({
  declarations: [
    AllAccountTypesComponent,
    CreateNewAccountTypeComponent,
  ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        SharedModule,
        NgxDatatableModule,
        ReactiveFormsModule
    ]
})
export class AccountTypesModule { }
