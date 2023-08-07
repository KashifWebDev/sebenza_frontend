import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../pages/auth/auth.service";
import {UserService} from "../../pages/user/user.service";
import {User, userProfile} from "../../../core/interfaces/interfaces";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../app.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userProfile: userProfile;
  profileForm: FormGroup;
  userRole: string = '';
  loggedInUser: User | null;

  fileToUpload: File;
  loadingBtn: boolean = false;
  formSubmit: boolean = false;
  formProcessed: boolean = false;
  loading: boolean = false;

  constructor(private authService: AuthService,
              private userService: UserService,
              private appService: AppService,
              private router: Router) { }

  ngOnInit(): void {
    this.userService.getProfileDetails().subscribe(
      response => {
        if(response.status && response.data?.profile){
          this.userProfile = response.data.profile;
        }
      },
      error => {
        this.loadingBtn = false;
        this.appService.swalFire('Error Occurred while fetching profile data!', 'error');
      }
    );

    this.userRole = this.authService.getUserRole();
    this.loggedInUser = this.authService.getLoggedInUser();

    this.profileForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      postcode: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      img: new FormControl('', [Validators.required]),
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
    formData.append(`address`, this.profileForm.value['address']);
    formData.append(`postcode`, this.profileForm.value['postcode']);
    formData.append(`state`, this.profileForm.value['state']);
    formData.append(`country`, this.profileForm.value['country']);
    formData.append(`city`, this.profileForm.value['city']);
    if(this.fileToUpload) formData.append('img', this.fileToUpload);
    this.userService.submitTicket(formData).subscribe(
      next => {
        if(next.status){
          this.appService.swalFire('Profile Updated Successfully!', 'success');
          this.router.navigate(['/']);
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
