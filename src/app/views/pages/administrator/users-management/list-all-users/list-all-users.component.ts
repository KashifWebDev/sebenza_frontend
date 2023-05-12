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

  users: User[];
  userDelete: User;
  @ViewChild('basicModal', { static: true }) deleteModal: TemplateRef<any> | NgbModalRef;
  ColumnMode = ColumnMode;
  deleteLoading: boolean = false;

  constructor(private adminService: AdministratorService, private modalService: NgbModal,
              private appService: AppService,private activeModal: NgbActiveModal) { }


  ngOnInit(): void {
    this.adminService.getAllUsers().subscribe(response => {
      if (response.status && response.data) {
        this.users = response.data.users;
      }
    });
  }

  deleteRole(user: User) {
    this.userDelete = user;
    console.log(user);
    this.modalService.open(this.deleteModal, {}).result.then((result) => {
      if(result == 'cancel') this.deleteLoading = false;
    }).catch((res) => {});
    setTimeout(() => {
      this.activeModal.close();
      console.log("clsoed");
    }, 1000);
  }

  confirmDelete(){
    this.deleteLoading = true;
    this.adminService.deleteUserSubmit(this.userDelete.id).subscribe(
      data => {
        if(data.status){
          this.deleteLoading = false;
          this.appService.swalFire('User Deleted Successfully', 'success');
          // this.modalService.
        }
      }
    );
  }

  getUserRole(user: User){
    return user.roles[0].name;
  }

}
