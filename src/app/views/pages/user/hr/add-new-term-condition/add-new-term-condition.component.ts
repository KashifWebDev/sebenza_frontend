import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {expenseType, termsConditionCategory} from "../../../../../core/interfaces/interfaces";
import {UserService} from "../../user.service";
import {AppService} from "../../../../../app.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add-new-term-condition',
  templateUrl: './add-new-term-condition.component.html',
  styleUrls: ['./add-new-term-condition.component.scss']
})
export class AddNewTermConditionComponent implements OnInit {
  addTermForm: FormGroup;
  loadingBtn: boolean = false;
  formSubmit: boolean = false;
  formProcessed: boolean = false;
  formData: FormData = new FormData();
  loading: boolean = false;
  termsCategories: termsConditionCategory[] = [];

  constructor(private userService: UserService,
              private appService: AppService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.addTermForm = this.formBuilder.group({
      category_id: ['', Validators.required],
      termscondition: ['', Validators.required]
    });

    this.loading = true;
    this.userService.getActiveTermsConditionsTypes().subscribe(
      (res) => {
        if(res.status && res.data?.termscategorys){
          this.termsCategories = res.data.termscategorys;
          this.loading = false;
        }else{
          this.appService.swalFire(res.message, 'error');
        }
      },
      (error) => {
        this.appService.swalFire('An error was occurred while fetching terms categories', 'error');
      }
    );
  }

  get form() {
    return this.addTermForm.controls;
  }

  submitForm(){
    this.loadingBtn = true;
    this.formProcessed = true;
    this.formSubmit = true;
    if (this.addTermForm.invalid) {
      this.loadingBtn = false;
      this.formSubmit = false;
      return;
    }

    const formData = new FormData();
    formData.append(`category_id`, this.addTermForm.value['category_id']);
    formData.append(`termscondition`, this.addTermForm.value['termscondition']);
    formData.append(`status`, 'Active');

    this.userService.addNewTerm(formData).subscribe(
      next => {
        if(next.status){
          this.appService.swalFire('New Term Condition added successfully!', 'success');
          this.formProcessed = false;
          this.formSubmit = false;
          this.addTermForm.reset();
          this.router.navigate(['../term-conditions'], {relativeTo: this.route});
        }else{
          this.appService.swalFire(next.message, 'error');
        }
        this.loadingBtn = false;
      },
      error => {
        this.loadingBtn = false;
        this.appService.swalFire('Error Occurred while adding term!', 'error');
      }
    );
  }

}
