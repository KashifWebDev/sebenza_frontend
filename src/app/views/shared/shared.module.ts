import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingButtonComponent } from './loading-button/loading-button.component';
import { CssLoaderComponent } from './css-loader/css-loader.component';



@NgModule({
    declarations: [
        LoadingButtonComponent,
        CssLoaderComponent
    ],
    exports: [
        LoadingButtonComponent
    ],
    imports: [
        CommonModule
    ]
})
export class SharedModule { }
