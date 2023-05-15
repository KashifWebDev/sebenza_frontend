import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AdministratorService} from "../../administrator.service";
import {AppService} from "../../../../../app.service";
import {role, User} from "../../../../../core/interfaces/interfaces";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add-new-role',
  templateUrl: './add-new-role.component.html',
  styleUrls: ['./add-new-role.component.scss']
})
export class AddNewRoleComponent implements OnInit {
  addRoleForm: FormGroup;
  loadingBtn: boolean = false;

  editRole: role;
  isEditMode: boolean = false;
  roleId: number;
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
    this.addRoleForm = new FormGroup({
      roleName: new FormControl('', [Validators.required]),
    });

    this.route.queryParams.subscribe(params => {
      this.roleId = +params['edit'];
      this.isEditMode = !!this.roleId;
      this.initializeForm();
      if (this.isEditMode) {
        this.loading = true;
        const user = this.adminService.fetchRoleDetail(this.roleId).subscribe(
          (res) => {
            if(res.status && res.data?.role){
              this.editRole = res.data.role;
              this.loading = false;
              this.populateForm(this.editRole);
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
    this.addRoleForm = this.formBuilder.group({
      roleName: ['', Validators.required]
    });
  }

  populateForm(role: role) {
    this.addRoleForm.patchValue({
      roleName: role.name,
    });
  }

  submitForm(){
    this.loadingBtn = true;

    this.formProcessed = true;
    this.formSubmit = true;
    if (this.addRoleForm.invalid) {
      this.formSubmit = false;
      return;
    }

    const formData = new FormData();
    formData.append(`roleName`, this.addRoleForm.value['roleName']);
    if(this.isEditMode){
      this.adminService.editRoleSubmit(formData, this.editRole.id).subscribe(
        next => {
          if(next.status){
            this.appService.swalFire('Role updated successfully!', 'success');
            this.formSubmit = false;
            this.addRoleForm.reset();
            this.router.navigate(['/administrator/roles-management']);
          }else{
            this.appService.swalFire(next.message, 'error');
          }
          this.loadingBtn = false;
        },
        error => {
          this.loadingBtn = false;
          this.appService.swalFire('Error Occurred while updating role!', 'error');
        }
      );
    }else{
      this.adminService.addNewRoleSubmit(formData).subscribe(
        next => {
          if(next.status){
            this.appService.swalFire('Role created successfully!', 'success');
            this.addRoleForm.reset();
          }else{
            this.appService.swalFire(next.message, 'error');
          }
          this.loadingBtn = false;
        },
        error => {
          this.loadingBtn = false;
          this.appService.swalFire('Error Occurred while creating role!', 'error');
        }
      );
    }



  }

}
