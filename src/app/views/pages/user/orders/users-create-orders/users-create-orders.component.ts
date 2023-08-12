import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../../../app.service";
import {UserService} from "../../user.service";
import {Router} from "@angular/router";
import {accountType} from "../../../../../core/interfaces/interfaces";

@Component({
  selector: 'app-users-create-orders',
  templateUrl: './users-create-orders.component.html',
  styleUrls: ['./users-create-orders.component.scss']
})
export class UsersCreateOrdersComponent implements OnInit {
  addNewOrderForm: FormGroup;
  loadingBtn: boolean = false;

  isEditMode: boolean = false;
  formSubmit: boolean = false;
  formProcessed: boolean = false;
  formData: FormData = new FormData();
  loading: boolean = false;
  btnLoading: boolean = false;
  accountTypes: accountType[];

  constructor(private userService: UserService,
              private appService: AppService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.userService.getAccTypes().subscribe(
      (response) => {
        if(response.status && response.data?.accounttypes){
          this.accountTypes = response.data.accounttypes;
        }
      }
    );

    this.addNewOrderForm = this.formBuilder.group({
      totalUsers: ['', Validators.required],
      accountType: ['', Validators.required],
    });
  }

  submitForm(){
    this.loadingBtn = true;
    this.formProcessed = true;
    this.formSubmit = true;
    if (this.addNewOrderForm.invalid) {
      this.loadingBtn = false;
      this.formSubmit = false;
      return;
    }

    const formData = new FormData();
    formData.append(`user_limit_id`, this.addNewOrderForm.value['totalUsers']);
    formData.append(`account_type_id`, this.addNewOrderForm.value['accountType']);

    this.userService.addNewOrder(formData).subscribe(
      data => {
        if(data.status){
          this.appService.swalFire('Order Placed Successfully', 'success');
          this.router.navigate(['user', 'orders']);
        }else{
          this.appService.swalFire(data.message, 'error');
        }
        this.btnLoading = false;
      },
      (error) => {
        this.btnLoading = false;
        this.appService.swalFire('An error occurred while creating Order', 'error');
      }
    );



  }

  get form() {
    return this.addNewOrderForm.controls;
  }

}
