import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailInvitationComponent } from './email-invitation/email-invitation.component';
import { BulkUserUploadComponent } from './bulk-user-upload/bulk-user-upload.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {NgbAlertModule} from "@ng-bootstrap/ng-bootstrap";

const routes: Routes = [
  {path: '', component: EmailInvitationComponent},
  {path: 'bulk-import', component: BulkUserUploadComponent},
];

@NgModule({
  declarations: [
    EmailInvitationComponent,
    BulkUserUploadComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    NgbAlertModule
  ]
})
export class InviteUsersModule { }
