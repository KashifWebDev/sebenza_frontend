import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../../../../core/interfaces/interfaces";
import {AdministratorService} from "../../administrator.service";
import {AppService} from "../../../../../app.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  userForm: FormGroup;
  isEditMode: boolean = false;
  userId: number;
  formSubmit: boolean = false;
  formProcessed: boolean = false;
  formData: FormData = new FormData();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private adminService: AdministratorService,
    private appService: AppService,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.userId = +params['edit'];
      this.isEditMode = !!this.userId;
      this.initializeForm();
      if (this.isEditMode) {
        // Fetch user details by userId or use the provided user data
        const user = this.adminService.fetchUserDetail(this.userId);
        this.populateForm(user);
      }
    });
  }

  get form() {
    return this.userForm.controls;
  }

  initializeForm() {
    // Initialize the form with empty fields
    this.userForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      company: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  populateForm(user: User | any) {
    // Populate the form fields with existing user data
    this.userForm.patchValue({
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      email: user.email,
      company: user.company,
      country: user.country,
      city: user.city,
      address: user.address,
    });
  }

  onSubmit() {
    this.formProcessed = true;
    this.formSubmit = true;
    if (this.userForm.invalid) {
      this.formSubmit = false;
      return;
    }

    this.formData.append('first_name', this.userForm.controls['first_name'].value);
    this.formData.append('last_name', this.userForm.controls['last_name'].value);
    this.formData.append('phone', this.userForm.controls['phone'].value);
    this.formData.append('email', this.userForm.controls['email'].value);
    this.formData.append('company_name', this.userForm.controls['company'].value);
    this.formData.append('country', this.userForm.controls['country'].value);
    this.formData.append('city', this.userForm.controls['city'].value);
    this.formData.append('address', this.userForm.controls['address'].value);

    if (this.isEditMode) {
      this.adminService.editUserSubmit(this.formData).subscribe(
        (data) => {
          if(data.status){
            this.appService.swalFire('User was updated successfully', 'success');
            this.formSubmit = false;
            this.userForm.reset();
          }else{
            this.appService.swalFire(data.message, 'error');
          }
        },
        (error) => {
          this.appService.swalFire('An error was occurred while updating user', 'error');
        }
      );
    } else {
      this.adminService.addNewUserSubmit(this.formData).subscribe(
        (data) => {
          if(data.status){
            this.formSubmit = false;
            this.userForm.reset();
            this.appService.swalFire('User was added successfully', 'success');
          }else{
            this.appService.swalFire(data.message, 'error');
          }
        },
        (error) => {
          this.formSubmit = false;
          this.appService.swalFire('An error was occurred while creating user', 'error');
        }
      );
    }

    // Clear the form after successful submission
  }

}
