import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {payFrequency, role, salary, User} from "../../../../../core/interfaces/interfaces";
import {ActivatedRoute, Router} from "@angular/router";
import {AdministratorService} from "../../../administrator/administrator.service";
import {AppService} from "../../../../../app.service";
import {UserService} from "../../user.service";

@Component({
  selector: 'app-add-salary',
  templateUrl: './add-salary.component.html',
  styleUrls: ['./add-salary.component.scss']
})
export class AddSalaryComponent implements OnInit {

  salaryForm: FormGroup;
  isEditMode: boolean = false;
  salaryID: number;
  formSubmit: boolean = false;
  formProcessed: boolean = false;;
  loading: boolean = false;
  users: {id: number, name: string}[];
  paymentFrequencies: payFrequency[];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private adminService: AdministratorService,
    private userService: UserService,
    private appService: AppService,
    private router: Router
  ) {}

  ngOnInit() {
    this.adminService.getAllUsers().subscribe(
      res => {
        if(res.status && res.data?.users){
          this.users = res.data.users.map(user => ({
            id: user.id,
            name: user.first_name+' '+user.last_name
          }))
        }
      }
    )
    this.userService.getAllPaymentFrequency().subscribe(
      res => {
        if(res.status && res.data?.paymentfrequencys){
          this.paymentFrequencies = res.data.paymentfrequencys;
        }
      }
    )

    this.route.queryParams.subscribe(params => {
      this.salaryID = +params['edit'];
      this.isEditMode = !!this.salaryID;
      this.initializeForm();
      if (this.isEditMode) {
        this.loading = true;

        const user = this.userService.fetchSingleSalary(this.salaryID).subscribe(
          (res) => {
            if(res.status && res.data?.salarys){
              this.loading = false;
              this.populateForm(res.data.salarys);
            }else{
              this.appService.swalFire(res.message, 'error');
            }
          },
          (error) => {
            this.appService.swalFire('An error was occurred while fetching user details!', 'error');
          }
        );
      }
    });
  }

  get form() {
    return this.salaryForm.controls;
  }

  initializeForm() {
    // Initialize the form with empty fields
    this.salaryForm = this.formBuilder.group({
      user_id: ['', Validators.required],
      payment_freq_id: ['', Validators.required],
      basic_salaray: ['', Validators.required],
      hourly_rate: ['', Validators.required],
      working_hour: ['']
    });
  }

  populateForm(salary: salary) {
    this.salaryForm.patchValue({
      user_id: salary.user_id,
      payment_freq_id: salary.payment_frequency_id,
      basic_salaray: salary.basic_salaray,
      hourly_rate: salary.hourly_rate,
      working_hour: salary.working_hour,
    });
    this.salaryForm.get('email')?.disable();
  }

  onSubmit() {
    this.formProcessed = true;
    this.formSubmit = true;
    if (this.salaryForm.invalid) {
      this.formSubmit = false;
      return;
    }

    let formData: FormData = new FormData()
    formData.append('user_id', this.salaryForm.controls['user_id'].value);
    formData.append('payment_frequency_id', this.salaryForm.controls['payment_freq_id'].value);
    formData.append('basic_salaray', this.salaryForm.controls['basic_salaray'].value);
    formData.append('hourly_rate', this.salaryForm.controls['hourly_rate'].value);
    formData.append('working_hour', this.salaryForm.controls['working_hour'].value);

    if (this.isEditMode) {
      this.userService.editSalary(formData, this.salaryID).subscribe(
        (data) => {
          if(data.status){
            this.appService.swalFire('Salary was updated successfully', 'success');
            this.router.navigate(['/user/hr/salaries']);
            this.formSubmit = false;
            this.salaryForm.reset();
          }else{
            this.formSubmit = false;
            this.appService.swalFire(data.message, 'error');
          }
        },
        (error) => {
          this.formSubmit = false;
          this.appService.swalFire('An error was occurred while updating Salary', 'error');
        }
      );
    } else {
      this.userService.addNewSalary(formData).subscribe(
        (data) => {
          if(data.status){
            this.appService.swalFire('Salary info was added successfully', 'success');
            this.formProcessed = false;
            this.formSubmit = false;
            this.salaryForm.reset();
            this.router.navigate(['/user/hr/salaries']);
          }else{
            this.appService.swalFire(data.message, 'error');
          }
          this.formSubmit = false;
        },
        (error) => {
          this.formSubmit = false;
          this.appService.swalFire('An error was occurred while processing salary', 'error');
        }
      );
    }
  }

}
