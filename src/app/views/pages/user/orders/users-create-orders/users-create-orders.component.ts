import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../../../app.service";
import {UserService} from "../../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users-create-orders',
  templateUrl: './users-create-orders.component.html',
  styleUrls: ['./users-create-orders.component.scss']
})
export class UsersCreateOrdersComponent implements OnInit {
  updateUsersForm: FormGroup;
  loadingBtn: boolean = false;

  isEditMode: boolean = false;
  formSubmit: boolean = false;
  formProcessed: boolean = false;
  formData: FormData = new FormData();
  loading: boolean = false;

  constructor(private userService: UserService,
              private appService: AppService,
              private router: Router) { }

  ngOnInit(): void {
    this.updateUsersForm = new FormGroup({
      number: new FormControl('', [Validators.required]),
    });
  }

  submitForm(){
    this.loadingBtn = true;
    this.formProcessed = true;
    this.formSubmit = true;
    if (this.updateUsersForm.invalid) {
      this.loadingBtn = false;
      this.formSubmit = false;
      return;
    }

    const formData = new FormData();
    formData.append(`new_user`, this.updateUsersForm.value['number']);

    this.userService.updateSubscription(formData).subscribe(
      next => {
        if(next.status){
          this.appService.swalFire('Order Updated successfully!', 'success');
          this.formProcessed = false;
          this.formSubmit = false;
          this.updateUsersForm.reset();
          this.router.navigate(['user/orders']);
        }else{
          this.appService.swalFire(next.message, 'error');
        }
        this.loadingBtn = false;
      },
      error => {
        this.loadingBtn = false;
        this.appService.swalFire('Error Occurred while updating details!', 'error');
      }
    );



  }

  get form() {
    return this.updateUsersForm.controls;
  }

}
