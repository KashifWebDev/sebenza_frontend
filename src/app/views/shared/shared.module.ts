import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingButtonComponent } from './loading-button/loading-button.component';
import { CssLoaderComponent } from './css-loader/css-loader.component';
import { PopupComponent } from './popup/popup.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";



@NgModule({
    declarations: [
        LoadingButtonComponent,
        CssLoaderComponent,
        PopupComponent
    ],
    exports: [
        LoadingButtonComponent,
        CssLoaderComponent,
        PopupComponent
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbDropdownModule
  ]
})
export class SharedModule { }
