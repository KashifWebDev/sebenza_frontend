import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import {RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared/shared.module";

const routes: Routes = [
  {path: '', component: SettingsPageComponent},
]

@NgModule({
  declarations: [
    SettingsPageComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class BasicSettingsModule { }
