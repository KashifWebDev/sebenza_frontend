import {AfterViewChecked, Component, OnInit} from '@angular/core';

import { DataTable } from "simple-datatables";
import {AdministratorService} from "../administrator.service";
import {role} from "../../../../core/interfaces/interfaces";

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss']
})
export class RoleManagementComponent implements OnInit, AfterViewChecked   {
  userRoles: role[] | undefined;

  constructor(private adminService: AdministratorService) { }

  ngOnInit(): void {
    this.adminService.getAllRoles().subscribe(response => {
      if (response.status) {
        this.userRoles = response.data?.roles;
      }
    });
  }

  ngAfterViewChecked(): void {
    if (this.userRoles) {
      const dataTable = new DataTable("#dataTableExample");
    }
  }

}
