import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User, userProfile} from "../../../../core/interfaces/interfaces";
import {AuthService} from "../../auth/auth.service";
import {UserService} from "../../user/user.service";
import {AppService} from "../../../../app.service";
import {Router} from "@angular/router";
import {AdministratorService} from "../administrator.service";
import {UserRole} from "../../../../core/roles/UserRole";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userProfile: userProfile;
  profileForm: FormGroup;
  userRole: UserRole | null;
  loggedInUser: User | null;

  fileToUpload: File;
  loadingBtn: boolean = false;
  formSubmit: boolean = false;
  formProcessed: boolean = false;
  loading: boolean = true;

  constructor(private authService: AuthService,
              private adminService: AdministratorService,
              private appService: AppService) { }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required]),
      img: new FormControl(''),
    });

    this.getProfileDetails();
    this.userRole = this.authService.getUserRole();
    this.loggedInUser = this.authService.getLoggedInUser();
  }

  getProfileDetails(){
    this.loading = true;
    this.adminService.getProfileDetails().subscribe(
      response => {
        if(response.status && response.data?.user){
          this.userProfile = response.data.user;
          this.populateForm();
          this.loading = false;
        }
      },
      error => {
        this.loadingBtn = false;
        this.appService.swalFire('Error Occurred while fetching profile data!', 'error');
      }
    );
  }

  populateForm() {
    this.profileForm.patchValue({
      firstName: this.userProfile.first_name,
      lastName: this.userProfile.last_name,
      mobile: this.userProfile.phone
    });
  }

  get form() {
    return this.profileForm.controls;
  }

  submitForm(){
    this.loadingBtn = true;

    this.formProcessed = true;
    this.formSubmit = true;
    if (this.profileForm.invalid) {
      this.formSubmit = false;
      this.loadingBtn = false;
      return;
    }

    const formData = new FormData();
    formData.append(`firstName`, this.profileForm.value['firstName']);
    formData.append(`lastName`, this.profileForm.value['lastName']);
    formData.append(`mobile`, this.profileForm.value['mobile']);
    if(this.fileToUpload) formData.append('img', this.fileToUpload);
    this.adminService.updateProfileDetails(formData).subscribe(
      next => {
        if(next.status && next.data?.user){
          this.appService.swalFire('Profile Updated Successfully!', 'success');
          this.getProfileDetails();
          this.authService.userDataUpdated(next.data.user);
        }else{
          this.appService.swalFire(next.message, 'error');
        }
        this.loadingBtn = false;
      },
      error => {
        this.loadingBtn = false;
        this.appService.swalFire('Error Occurred while updating profile!', 'error');
      }
    );
  }

  handleFileInput(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.fileToUpload = fileInput.files[0];
    }
  }

}
