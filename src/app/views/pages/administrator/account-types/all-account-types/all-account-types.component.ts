import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {accountType, role} from "../../../../../core/interfaces/interfaces";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {AdministratorService} from "../../administrator.service";
import {AppService} from "../../../../../app.service";
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-all-account-types',
  templateUrl: './all-account-types.component.html',
  styleUrls: ['./all-account-types.component.scss']
})
export class AllAccountTypesComponent implements OnInit {
  @ViewChild('dataTable') dataTable!: ElementRef;
  basicModalCloseResult: string = '';
  accTypes: accountType[] = [];

  @ViewChild('basicModal', { static: true }) deleteModal: TemplateRef<any> | NgbModalRef;
  ColumnMode = ColumnMode;
  deleteLoading: boolean = false;
  modalReference: NgbModalRef;
  filteredData: accountType[] = [...this.accTypes];
  searchText = '';
  deleteAccType: accountType;

  constructor(private adminService: AdministratorService, private modalService: NgbModal,
              private appService: AppService) { }

  ngOnInit(): void {
    this.adminService.getAccTypes().subscribe(response => {
      if (response.status && response.data?.accounttypes) {
        this.accTypes = response.data.accounttypes;
        this.filterData();
      }
    });
  }

  filterData() {
    if (this.searchText.trim() !== '') {
      const searchTerms = this.searchText.toLowerCase().split(' ');

      this.filteredData = this.accTypes.filter(item => {
        const itemValues = Object.values(item).map(value => {
          if (value !== null && value !== undefined) {
            return value.toString().toLowerCase();
          }
          return '';
        });
        return searchTerms.every(term => itemValues.some(value => value.includes(term)));
      });
    } else {
      this.filteredData = [...this.accTypes];
    }
  }

  delAccType(accType: accountType) {
    this.deleteAccType = accType;
    this.modalReference = this.modalService.open(this.deleteModal, {});
  }

  confirmDelete(){
    this.deleteLoading = true;
    this.adminService.deleteAccTypeSubmit(this.deleteAccType.id).subscribe(
      data => {
        if(data.status){
          this.appService.swalFire('Account Type Deleted Successfully', 'success');
          this.modalReference.close();
        }else{
          this.appService.swalFire(data.message, 'error');
        }
        this.deleteLoading = false;
        this.accTypes = this.accTypes.filter((accType: accountType) => accType.id != this.deleteAccType.id);
        this.filterData();
      },
      (error) => {
        this.deleteLoading = false;
        this.appService.swalFire('An error occurred while deleting user', 'error');
      }
    );
  }
}
