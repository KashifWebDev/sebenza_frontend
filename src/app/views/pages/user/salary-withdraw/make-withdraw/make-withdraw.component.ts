import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../../../app.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../user.service";

@Component({
  selector: 'app-make-withdraw',
  templateUrl: './make-withdraw.component.html',
  styleUrls: ['./make-withdraw.component.scss']
})
export class MakeWithdrawComponent implements OnInit {
  withdrawForm: FormGroup;
  loadingBtn: boolean = false;

  isEditMode: boolean = false;
  formSubmit: boolean = false;
  formProcessed: boolean = false;
  loading: boolean = false;

  constructor(private userService: UserService,
              private appService: AppService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.withdrawForm = this.formBuilder.group({
      amount: ['', Validators.required]
    });
  }

  submitForm(){
    this.loadingBtn = true;
    this.formProcessed = true;
    this.formSubmit = true;
    if (this.withdrawForm.invalid) {
      this.loadingBtn = false;
      this.formSubmit = false;
      return;
    }

    const formData = new FormData();
    formData.append(`amount`, this.withdrawForm.value['amount']);

    this.userService.withdrawRequest(formData).subscribe(
      next => {
        if(next.status){
          this.appService.swalFire('Request was generated successfully!', 'success');
          this.formProcessed = false;
          this.formSubmit = false;
          this.withdrawForm.reset();
          this.router.navigate(['user/salary/withdraw']);
        }else{
          this.appService.swalFire(next.message, 'error');
        }
        this.loadingBtn = false;
      },
      error => {
        this.loadingBtn = false;
        this.appService.swalFire('Error Occurred while processing your request', 'error');
      }
    );
  }

  get form() {
    return this.withdrawForm.controls;
  }

}
