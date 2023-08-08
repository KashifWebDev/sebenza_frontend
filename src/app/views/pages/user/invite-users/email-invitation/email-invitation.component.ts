import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AdministratorService} from "../../../administrator/administrator.service";
import {AppService} from "../../../../../app.service";
import {role} from "../../../../../core/interfaces/interfaces";
import {UserService} from "../../user.service";

@Component({
  selector: 'app-email-invitation',
  templateUrl: './email-invitation.component.html',
  styleUrls: ['./email-invitation.component.scss']
})
export class EmailInvitationComponent implements OnInit {
  inviteForm: FormGroup;
  loadingBtn: boolean = false;

  formSubmit: boolean = false;
  formProcessed: boolean = false;
  formData: FormData = new FormData();
  loading: boolean = true;
  userRoles: role[];

  constructor(private userService: UserService,
              private adminService: AdministratorService,
              private appService: AppService) { }

  ngOnInit(): void {
    this.inviteForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      roleName: new FormControl('', [Validators.required]),
    });

    this.adminService.getAllRoles().subscribe(response => {
      if (response.status && response.data?.roles) {
        this.userRoles = response.data.roles;
        this.loading = false;
      }
    });
  }


  get form() {
    return this.inviteForm.controls;
  }

  submitForm(){
    this.loadingBtn = true;
    this.formProcessed = true;
    this.formSubmit = true;
    if (this.inviteForm.invalid) {
      this.loadingBtn = false;
      this.formSubmit = false;
      return;
    }

    const formData = new FormData();
    formData.append(`email`, this.inviteForm.value['email']);
    formData.append(`role`, this.inviteForm.value['roleName']);

      this.userService.inviteUserByEmail(formData).subscribe(
        next => {
          if(next.status){
            this.appService.swalFire('Invitation was sent successfully!', 'success');
            this.formProcessed = false;
            this.formSubmit = false;
            this.inviteForm.reset();
          }else{
            this.appService.swalFire(next.message, 'error');
          }
          this.loadingBtn = false;
        },
        error => {
          this.loadingBtn = false;
          this.appService.swalFire('Error Occurred while sending invitation!', 'error');
        }
      );
  }

}
