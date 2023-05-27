import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {accountType, role} from "../../../../../core/interfaces/interfaces";
import {AdministratorService} from "../../administrator.service";
import {AppService} from "../../../../../app.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-create-new-account-type',
  templateUrl: './create-new-account-type.component.html',
  styleUrls: ['./create-new-account-type.component.scss']
})
export class CreateNewAccountTypeComponent implements OnInit {
  addAccTypeForm: FormGroup;
  loadingBtn: boolean = false;

  editAccType: accountType;
  isEditMode: boolean = false;
  accTypeId: number;
  formSubmit: boolean = false;
  formProcessed: boolean = false;
  formData: FormData = new FormData();
  loading: boolean = false;

  constructor(private adminService: AdministratorService,
              private appService: AppService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.addAccTypeForm = new FormGroup({
      roleName: new FormControl('', [Validators.required]),
    });

    this.route.queryParams.subscribe(params => {
      this.accTypeId = +params['edit'];
      this.isEditMode = !!this.accTypeId;
      this.initializeForm();
      if (this.isEditMode) {
        this.loading = true;
        const user = this.adminService.fetchAccTypeDetail(this.accTypeId).subscribe(
          (res) => {
            if(res.status && res.data?.accounttype){
              this.editAccType = res.data.accounttype;
              this.loading = false;
              this.populateForm(this.editAccType);
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

  initializeForm() {
    // Initialize the form with empty fields
    this.addAccTypeForm = this.formBuilder.group({
      name: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  populateForm(accType: accountType) {
    this.addAccTypeForm.patchValue({
      name: accType.account_type,
      status: accType.status,
    });
  }

  get form() {
    return this.addAccTypeForm.controls;
  }

  submitForm(){
    this.loadingBtn = true;
    this.formProcessed = true;
    this.formSubmit = true;
    if (this.addAccTypeForm.invalid) {
      this.loadingBtn = false;
      this.formSubmit = false;
      return;
    }

    const formData = new FormData();
    formData.append(`account_type`, this.addAccTypeForm.value['name']);
    formData.append(`status`, this.addAccTypeForm.value['status']);
    if(this.isEditMode){
      formData.append(`account_type_id`, this.editAccType.id.toString());
      this.adminService.editAccTypeSubmit(formData, this.editAccType.id).subscribe(
        next => {
          if(next.status){
            this.appService.swalFire('Account Type updated successfully!', 'success');
            this.formSubmit = false;
            this.addAccTypeForm.reset();
            this.router.navigate(['/administrator/account-types']);
          }else{
            this.appService.swalFire(next.message, 'error');
          }
          this.loadingBtn = false;
        },
        error => {
          this.loadingBtn = false;
          this.appService.swalFire('Error Occurred while updating Account Type!', 'error');
        }
      );
    }else{
      this.adminService.addNewAccTypeSubmit(formData).subscribe(
        next => {
          if(next.status){
            this.appService.swalFire('Account Type created successfully!', 'success');
            this.formProcessed = false;
            this.formSubmit = false;
            this.addAccTypeForm.reset();
          }else{
            this.appService.swalFire(next.message, 'error');
          }
          this.loadingBtn = false;
        },
        error => {
          this.loadingBtn = false;
          this.appService.swalFire('Error Occurred while creating account type!', 'error');
        }
      );
    }



  }
}
