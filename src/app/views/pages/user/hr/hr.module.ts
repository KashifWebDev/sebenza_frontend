import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayFrequencyComponent } from './pay-frequency/pay-frequency.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  {path: '', redirectTo: 'pay-frequency'},
  {path: 'pay-frequency', component: PayFrequencyComponent},
]

@NgModule({
  declarations: [
    PayFrequencyComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class HrModule { }
