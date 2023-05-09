import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {role} from "../../../../../core/interfaces/interfaces";
import {AdministratorService} from "../../administrator.service";
import {DataTable} from "simple-datatables";

@Component({
  selector: 'app-list-all-roles',
  templateUrl: './list-all-roles.component.html',
  styleUrls: ['./list-all-roles.component.scss']
})
export class ListAllRolesComponent implements OnInit, AfterViewChecked {

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

  getPermission(permission: string){
    return  permission.replace(/(\b[a-z](?!\b)|\G)[a-z]*\b\.?/gi, (word) => {
      if (word.endsWith('.')) {
        word = word.substring(0, word.length - 1) + ' > ';
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
  }

}
