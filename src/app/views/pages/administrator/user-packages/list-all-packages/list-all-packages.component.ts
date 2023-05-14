import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Package, role} from "../../../../../core/interfaces/interfaces";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {AdministratorService} from "../../administrator.service";
import {AppService} from "../../../../../app.service";
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-list-all-packages',
  templateUrl: './list-all-packages.component.html',
  styleUrls: ['./list-all-packages.component.scss']
})
export class ListAllPackagesComponent implements OnInit {


  @ViewChild('dataTable') dataTable!: ElementRef;
  basicModalCloseResult: string = '';
  packages: Package[] = [];

  @ViewChild('basicModal', { static: true }) deleteModal: TemplateRef<any> | NgbModalRef;
  ColumnMode = ColumnMode;
  deleteLoading: boolean = false;
  modalReference: NgbModalRef;
  filteredData: Package[] = [...this.packages];
  searchText = '';
  delPkg: Package;

  constructor(private adminService: AdministratorService, private modalService: NgbModal,
              private appService: AppService) { }

  ngOnInit(): void {
    this.adminService.getAllPkgs().subscribe(response => {
      if (response.status && response.data?.accountpackages) {
        this.packages = response.data.accountpackages;
        this.filterData();
      }
    });
  }

  filterData() {
    if (this.searchText.trim() !== '') {
      const searchTerms = this.searchText.toLowerCase().split(' ');

      this.filteredData = this.packages.filter(item => {
        const itemValues = Object.values(item).map(value => {
          if (value !== null && value !== undefined) {
            return value.toString().toLowerCase();
          }
          return '';
        });
        return searchTerms.every(term => itemValues.some(value => value.includes(term)));
      });
    } else {
      this.filteredData = [...this.packages];
    }
  }

  deletePkg(pkg: Package) {
    this.delPkg = pkg;
    this.modalReference = this.modalService.open(this.deleteModal, {});
  }

  confirmDelete(){
    this.deleteLoading = true;
    this.adminService.deletePkgSubmit(this.delPkg.id).subscribe(
      data => {
        if(data.status){
          this.appService.swalFire('Package Deleted Successfully', 'success');
          this.modalReference.close();
        }else{
          this.appService.swalFire(data.message, 'error');
        }
        this.deleteLoading = false;
        this.packages = this.packages.filter((pkg: Package) => pkg.id != this.delPkg.id);
        this.filterData();
      },
      (error) => {
        this.deleteLoading = false;
        this.appService.swalFire('An error occurred while deleting user', 'error');
      }
    );
  }

}
