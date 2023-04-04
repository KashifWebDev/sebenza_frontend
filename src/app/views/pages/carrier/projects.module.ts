import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrierComponentComponent } from './carrier-component.component';
import {RouterModule, Routes} from "@angular/router";
import { ProjectsComponent } from './projects/projects.component';
import {QuillModule} from "ngx-quill";
import {TagInputModule} from "ngx-chips";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FormErrorComponent } from './projects/form-error/form-error.component';
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import {SharedModule} from "../../shared/shared.module";

const routes: Routes = [
  {path: '', component: CarrierComponentComponent,
    children: [
      {
        path: '',
        redirectTo: 'projects',
        pathMatch: 'full'
      },
      {
        path: 'projects',
        component: ProjectsComponent
      },
    ]
  }
];

@NgModule({
  declarations: [
    CarrierComponentComponent,
    ProjectsComponent,
    FormErrorComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        QuillModule,
        TagInputModule,
        FormsModule,
        ReactiveFormsModule,
        SweetAlert2Module,
        SharedModule,
    ],
})
export class ProjectsModule { }
