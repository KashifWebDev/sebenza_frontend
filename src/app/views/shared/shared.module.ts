import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingButtonComponent } from './loading-button/loading-button.component';



@NgModule({
    declarations: [
        LoadingButtonComponent
    ],
    exports: [
        LoadingButtonComponent
    ],
    imports: [
        CommonModule
    ]
})
export class SharedModule { }
