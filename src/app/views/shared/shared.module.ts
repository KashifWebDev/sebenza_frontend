import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingButtonComponent } from './loading-button/loading-button.component';
import { CssLoaderComponent } from './css-loader/css-loader.component';
import { UserProfileComponent } from './user-profile/user-profile.component';



@NgModule({
    declarations: [
        LoadingButtonComponent,
        CssLoaderComponent,
        UserProfileComponent
    ],
    exports: [
        LoadingButtonComponent,
        CssLoaderComponent
    ],
    imports: [
        CommonModule
    ]
})
export class SharedModule { }
