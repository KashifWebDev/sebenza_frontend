import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../../../../core/interfaces/interfaces";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  userForm: FormGroup;
  isEditMode: boolean = false;
  userId: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.userId = +params['edit'];
      this.isEditMode = !!this.userId;
      this.initializeForm();
      if (this.isEditMode) {
        // Fetch user details by userId or use the provided user data
        const user = this.getUserDetails(this.userId);
        this.populateForm(user);
      }
    });
  }

  initializeForm() {
    // Initialize the form with empty fields
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  populateForm(user: User | any) {
    // Populate the form fields with existing user data
    this.userForm.patchValue({
      username: user.first_name,
      email: user.email,
      password: user.last_name
    });
  }

  onSubmit() {
    if (this.userForm.invalid) {
      // Handle form validation errors
      return;
    }

    if (this.isEditMode) {
      // Perform user update logic using this.userForm.value and this.userId
      // ...
      console.log('User updated:', this.userForm.value);
    } else {
      // Perform user registration logic using this.userForm.value
      // ...
      console.log('User registered:', this.userForm.value);
    }

    // Clear the form after successful submission
    this.userForm.reset();
  }

  getUserDetails(userId: number): User | {} {
    // Retrieve user details from your data source
    // Replace this with your implementation to fetch the user details
    // using the provided user ID
    return {
      id: userId,
      first_name: 'JohnDoe',
      email: 'johndoe@example.com',
      la: '********'
    };
  }

}
