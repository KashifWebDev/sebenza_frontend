import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AdministratorService} from "../../administrator.service";
import {AppService} from "../../../../../app.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Package} from "../../../../../core/interfaces/interfaces";

@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.scss']
})
export class AddPackageComponent implements OnInit {

  addPkgForm: FormGroup;
  loadingBtn: boolean = false;

  editPkg: Package;
  isEditMode: boolean = false;
  pkgId: number;
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
    this.initializeForm();

    this.route.queryParams.subscribe(params => {
      this.pkgId = +params['edit'];
      this.isEditMode = !!this.pkgId;
      if (this.isEditMode) {
        this.loading = true;
        // Fetch user details by userId or use the provided user data
        const user = this.adminService.fetchPkgDetail(this.pkgId).subscribe(
          (res) => {
            if(res.status && res.data?.accountpackage){
              this.editPkg = res.data.accountpackage;
              this.loading = false;
              this.populateForm(this.editPkg);
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
    this.addPkgForm = this.formBuilder.group({
      pkgName: ['', Validators.required],
      maxUsers: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  get form() {
    return this.addPkgForm.controls;
  }

  populateForm(pkg: Package) {
    console.log(pkg);
    this.addPkgForm.patchValue({
      pkgName: pkg.account_package,
      maxUsers: pkg.max_user,
      status: pkg.status,
    });
  }

  submitForm(){
    this.loadingBtn = true;

    this.formProcessed = true;
    this.formSubmit = true;
    if (this.addPkgForm.invalid) {
      this.loadingBtn = false;
      this.formSubmit = false;
      return;
    }

    const formData = new FormData();
    formData.append(`account_package`, this.addPkgForm.value['pkgName']);
    formData.append(`max_user`, this.addPkgForm.value['maxUsers']);
    formData.append(`status`, this.addPkgForm.value['status']);

    if(this.isEditMode){
      formData.append(`account_package_id`, this.editPkg.id.toString());
      this.adminService.editPkgSubmit(formData, this.editPkg.id).subscribe(
        next => {
          if(next.status){
            this.appService.swalFire('Role updated successfully!', 'success');
            this.formSubmit = false;
            this.addPkgForm.reset();
            this.router.navigate(['/administrator/user-packages']);
          }else{
            this.appService.swalFire(next.message, 'error');
          }
          this.formProcessed = false;
          this.loadingBtn = false;
        },
        error => {
          this.formProcessed = false;
          this.loadingBtn = false;
          this.appService.swalFire('Error Occurred while updating role!', 'error');
        }
      );
    }
    else{
      this.adminService.addNewPkgSubmit(formData).subscribe(
        next => {
          if(next.status){
            this.appService.swalFire('Package created successfully!', 'success');
            this.addPkgForm.reset();
          }else{
            this.appService.swalFire(next.message, 'error');
          }
          this.loadingBtn = false;
          this.formProcessed = false;
        },
        error => {
          this.loadingBtn = false;
          this.formProcessed = false;
          this.appService.swalFire('Error Occurred while creating role!', 'error');
        }
      );
    }

  }

}
