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
  addRoleForm: FormGroup;

  constructor(private adminService: AdministratorService, private appService: AppService) { }

  ngOnInit(): void {
    this.addRoleForm = new FormGroup({
      roleName: new FormControl('', [Validators.required]),
    });
  }

  submitForm(){
    const formData = new FormData();
    formData.append(`roleName`, this.addRoleForm.value['roleName']);

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
