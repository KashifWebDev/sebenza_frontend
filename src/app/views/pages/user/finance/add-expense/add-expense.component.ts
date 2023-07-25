import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../../../app.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../user.service";
import {expenseType} from "../../../../../core/interfaces/interfaces";

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent implements OnInit {
  addExpenseForm: FormGroup;
  loadingBtn: boolean = false;
  formSubmit: boolean = false;
  formProcessed: boolean = false;
  formData: FormData = new FormData();
  loading: boolean = false;
  expenseTypes: expenseType[] = [];
  fileToUpload: File;

  constructor(private userService: UserService,
              private appService: AppService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.addExpenseForm = this.formBuilder.group({
      name: ['', Validators.required],
      amount: ['', Validators.required],
      type: ['', Validators.required],
      file: [''],
    });

    this.loading = true;
    const user = this.userService.getExpenseTypes().subscribe(
      (res) => {
        if(res.status && res.data?.expensetypes){
          this.expenseTypes = res.data.expensetypes;
          this.loading = false;
        }else{
          this.appService.swalFire(res.message, 'error');
        }
      },
      (error) => {
        this.appService.swalFire('An error was occurred while fetching expense types!', 'error');
      }
    );
  }

  get form() {
    return this.addExpenseForm.controls;
  }

  submitForm(){
    this.loadingBtn = true;
    this.formProcessed = true;
    this.formSubmit = true;
    if (this.addExpenseForm.invalid) {
      this.loadingBtn = false;
      this.formSubmit = false;
      return;
    }

    const formData = new FormData();
    formData.append(`expensetype_id`, this.addExpenseForm.value['type']);
    formData.append(`amount`, this.addExpenseForm.value['amount']);
    formData.append(`notes`, this.addExpenseForm.value['name']);
    if(this.fileToUpload) formData.append('image', this.fileToUpload);

      this.userService.addNewExpenseSubmit(formData).subscribe(
        next => {
          if(next.status){
            this.appService.swalFire('Expense added successfully!', 'success');
            this.formProcessed = false;
            this.formSubmit = false;
            this.addExpenseForm.reset();
          }else{
            this.appService.swalFire(next.message, 'error');
          }
          this.loadingBtn = false;
        },
        error => {
          this.loadingBtn = false;
          this.appService.swalFire('Error Occurred while adding expense!', 'error');
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
