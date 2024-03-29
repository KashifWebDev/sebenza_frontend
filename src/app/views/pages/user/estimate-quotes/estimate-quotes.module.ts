import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddNewTermConditionComponent} from "./add-new-term-condition/add-new-term-condition.component";
import {TermsCategoryComponent} from "./terms-category/terms-category.component";
import {TermsConditionsListingComponent} from "./terms-conditions-listing/terms-conditions-listing.component";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import { EstimateSettingsComponent } from './estimate-settings/estimate-settings.component';
import { AddEstimateQuoteComponent } from './add-estimate-quote/add-estimate-quote.component';
import {NgSelectModule} from "@ng-select/ng-select";

import {NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";
import {ColorPickerModule} from "ngx-color-picker";
import {QuillModule} from "ngx-quill";
import { ViewEstimateComponent } from './view-estimate/view-estimate.component';
import {FeatherIconModule} from "../../../../core/feather-icon/feather-icon.module";
const routes: Routes = [
  {path: 'add-new-term', component: AddNewTermConditionComponent},
  {path: 'terms-categories', component: TermsCategoryComponent},
  {path: 'term-conditions', component: TermsConditionsListingComponent},
  {path: 'estimate-settings', component: EstimateSettingsComponent},
  {path: 'new-estimate', component: AddEstimateQuoteComponent},
  {path: 'view/:id', component: ViewEstimateComponent},
]

@NgModule({
  declarations: [
    TermsConditionsListingComponent,
    TermsCategoryComponent,
    AddNewTermConditionComponent,
    EstimateSettingsComponent,
    AddEstimateQuoteComponent,
    ViewEstimateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    FormsModule,
    NgSelectModule,
    NgbDatepickerModule,
    ColorPickerModule,
    QuillModule,
    FeatherIconModule
  ]
})
export class EstimateQuotesModule { }
