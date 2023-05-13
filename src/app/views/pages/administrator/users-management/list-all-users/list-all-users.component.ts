import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AdministratorService} from "../../administrator.service";

import {User} from "../../../../../core/interfaces/interfaces";
import { ColumnMode } from '@swimlane/ngx-datatable';
import {NgbActiveModal, NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {AppService} from "../../../../../app.service";

@Component({
  selector: 'app-list-all-users',
  templateUrl: './list-all-users.component.html',
  styleUrls: ['./list-all-users.component.scss']
})
export class ListAllUsersComponent implements OnInit {

  users: User[] = [];
  userDelete: User;
  @ViewChild('basicModal', { static: true }) deleteModal: TemplateRef<any> | NgbModalRef;
  ColumnMode = ColumnMode;
  deleteLoading: boolean = false;
  modalReference: NgbModalRef;
  filteredData: User[] = [...this.users];
  searchText = '';


  constructor(private adminService: AdministratorService, private modalService: NgbModal,
              private appService: AppService) { }


  ngOnInit(): void {
    this.adminService.getAllUsers().subscribe(response => {
      if (response.status && response.data) {
        this.users = response.data.users;
        this.filterData();
      }
    });
  }

  filterData() {
    if (this.searchText.trim() !== '') {
      const searchTerms = this.searchText.toLowerCase().split(' ');

      this.filteredData = this.users.filter(item => {
        const itemValues = Object.values(item).map(value => {
          if (value !== null && value !== undefined) {
            return value.toString().toLowerCase();
          }
          return '';
        });
        return searchTerms.every(term => itemValues.some(value => value.includes(term)));
      });
    } else {
      this.filteredData = [...this.users];
    }
  }

  deleteRole(user: User) {
    this.userDelete = user;
    console.log(user);
    this.modalReference = this.modalService.open(this.deleteModal, {});
  }

  confirmDelete(){
    this.deleteLoading = true;
    this.adminService.deleteUserSubmit(this.userDelete.id).subscribe(
      data => {
        if(data.status){
          this.appService.swalFire('User Deleted Successfully', 'success');
          this.modalReference.close();
        }else{
          this.appService.swalFire(data.message, 'error');
        }
        this.deleteLoading = false;
        this.users = this.users.filter((user: User) => user.id != this.userDelete.id);
        this.filterData();
      },
      (error) => {
        this.deleteLoading = false;
        this.appService.swalFire('An error occurred while deleting user', 'error');
      }
    );
  }

  getUserRole(user: User){
    return user.roles[0].name;
  }

}
