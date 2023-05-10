import { Component, OnInit } from '@angular/core';
import {PeoplesData} from "../../../../../core/dummy-datas/peoples.data";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {role, rolePermission} from "../../../../../core/interfaces/interfaces";
import {AdministratorService} from "../../administrator.service";
import {AppService} from "../../../../../app.service";

@Component({
  selector: 'app-add-new-role',
  templateUrl: './add-new-role.component.html',
  styleUrls: ['./add-new-role.component.scss']
})
export class AddNewRoleComponent implements OnInit {

  permissions: rolePermission[] | undefined | any = [];
  addRoleForm: FormGroup;
  selectedPermissions: FormControl;
  loading: boolean = true;

  constructor(private adminService: AdministratorService, private appService: AppService) { }

  ngOnInit(): void {
    this.fetchAllPermissions();
    this.selectedPermissions = new FormControl('');

    this.addRoleForm = new FormGroup({
      roleName: new FormControl('', [Validators.required]),
      permissions: this.selectedPermissions
    });
  }

  fetchAllPermissions(){
    this.adminService.getAllPermissions().subscribe(
      response => {
        if(response.status){
          this.permissions = response.data?.permissions;
          this.loading = false;
        }
      }
    );
  }

  getPermissions(permission: rolePermission[]){
    permission.forEach(
      (perm: rolePermission) => {
        perm.name = this.adminService.reformatPermissionText(perm.name);
      }
    );
    return permission;
  }

  submitForm(){
    // let permissions: role[] = this.addRoleForm.value['permissions'];
    // const formData = new FormData();
    // formData.append(`roleName`, this.addRoleForm.value['roleName']);
    //
    // permissions.forEach((value: role, index: number) => {
    //   const modifiedName = this.adminService.reversePermissionText(value.name);
    //   formData.append(`permission[${index}]`, modifiedName);
    // });

    // permissions.forEach((value: role, index: number) => {
    //   const modifiedValue: role = {
    //     ...value,
    //     name: this.adminService.reversePermissionText(value.name)
    //   };
    //   formData.append(`permission[${index}]`, modifiedValue.name);
    // });
    // formData.forEach((value, key) => {
    //   console.log(key, value);
    // });

    let permissions: role[] = this.addRoleForm.value['permissions'];
    const formData = new FormData();
    formData.append(`roleName`, this.addRoleForm.value['roleName']);
    permissions.forEach((value: role, index: number) => {
      const modifiedName = this.adminService.reversePermissionText(value.name);
      formData.append(`permissions[${index}]`, modifiedName);
    });


    this.adminService.addNewRoleSubmit(formData).subscribe(
      next => {
        if(next.status){
          this.appService.swalFire('Role created successfully!', 'success');
          this.addRoleForm.reset();
        }else{
          this.appService.swalFire(next.message, 'error');
        }
      },
      error => {
        this.appService.swalFire('Error Occurred while creating role!', 'error');
      }
    );
  }

}
