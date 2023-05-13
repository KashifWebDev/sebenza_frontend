import { Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {role} from "../../../../../core/interfaces/interfaces";
import {AdministratorService} from "../../administrator.service";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import { ColumnMode } from '@swimlane/ngx-datatable';
import {AppService} from "../../../../../app.service";

@Component({
  selector: 'app-list-all-roles',
  templateUrl: './list-all-roles.component.html',
  styleUrls: ['./list-all-roles.component.scss']
})
export class ListAllRolesComponent implements OnInit {

  @ViewChild('dataTable') dataTable!: ElementRef;
  basicModalCloseResult: string = '';
  userRoles: role[] = [];

  @ViewChild('basicModal', { static: true }) deleteModal: TemplateRef<any> | NgbModalRef;
  ColumnMode = ColumnMode;
  deleteLoading: boolean = false;
  modalReference: NgbModalRef;
  filteredData: role[] = [...this.userRoles];
  searchText = '';
  deleteUserRole: role;

  constructor(private adminService: AdministratorService, private modalService: NgbModal,
              private appService: AppService) { }


  ngOnInit(): void {
    this.adminService.getAllRoles().subscribe(response => {
      if (response.status && response.data?.roles) {
        this.userRoles = response.data.roles;
        this.filterData();
      }
    });
  }

  filterData() {
    if (this.searchText.trim() !== '') {
      const searchTerms = this.searchText.toLowerCase().split(' ');

      this.filteredData = this.userRoles.filter(item => {
        const itemValues = Object.values(item).map(value => {
          if (value !== null && value !== undefined) {
            return value.toString().toLowerCase();
          }
          return '';
        });
        return searchTerms.every(term => itemValues.some(value => value.includes(term)));
      });
    } else {
      this.filteredData = [...this.userRoles];
    }
  }

  deleteRole(role: role) {
    this.deleteUserRole = role;
    this.modalReference = this.modalService.open(this.deleteModal, {});
  }

  confirmDelete(){
    this.deleteLoading = true;
    this.adminService.deleteRoleSubmit(this.deleteUserRole.id).subscribe(
      data => {
        if(data.status){
          this.appService.swalFire('Role Deleted Successfully', 'success');
          this.modalReference.close();
        }else{
          this.appService.swalFire(data.message, 'error');
        }
        this.deleteLoading = false;
        this.userRoles = this.userRoles.filter((role: role) => role.id != this.deleteUserRole.id);
        this.filterData();
      },
      (error) => {
        this.deleteLoading = false;
        this.appService.swalFire('An error occurred while deleting user', 'error');
      }
    );
  }
}
