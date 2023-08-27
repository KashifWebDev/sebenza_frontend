import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {salary, User} from "../../../../../core/interfaces/interfaces";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {AdministratorService} from "../../../administrator/administrator.service";
import {AppService} from "../../../../../app.service";
import { ColumnMode } from '@swimlane/ngx-datatable';
import {UserService} from "../../user.service";

@Component({
  selector: 'app-salaries',
  templateUrl: './salaries.component.html',
  styleUrls: ['./salaries.component.scss']
})
export class SalariesComponent implements OnInit {

  salaries: salary[] = [];
  @ViewChild('basicModal', { static: true }) deleteModal: TemplateRef<any> | NgbModalRef;
  ColumnMode = ColumnMode;
  deleteLoading: boolean = false;
  modalReference: NgbModalRef;
  filteredData: salary[] = [...this.salaries];
  searchText = '';
  deleteSalaryID: number;


  constructor(private userService: UserService, private modalService: NgbModal,
              private appService: AppService) { }

  ngOnInit(): void {
    this.userService.getAllSalaries().subscribe(response => {
      if (response.status && response.data) {
        this.salaries = response.data.salarys;
        this.filterData();
      }
    });
  }

  filterData() {
    if (this.searchText.trim() !== '') {
      const searchTerms = this.searchText.toLowerCase().split(' ');

      this.filteredData = this.salaries.filter(item => {
        const itemValues = Object.values(item).map(value => {
          if (value !== null && value !== undefined) {
            return value.toString().toLowerCase();
          }
          return '';
        });
        return searchTerms.every(term => itemValues.some(value => value.includes(term)));
      });
    } else {
      this.filteredData = [...this.salaries];
    }
  }

  deleteRole(id: number) {
    this.deleteSalaryID = id;
    this.modalReference = this.modalService.open(this.deleteModal, {});
  }

  confirmDelete(){
    this.deleteLoading = true;
    this.userService.deleteSalary(this.deleteSalaryID).subscribe(
      data => {
        if(data.status){
          this.appService.swalFire('Salary Info Deleted Successfully', 'success');
          this.modalReference.close();
        }else{
          this.appService.swalFire(data.message, 'error');
        }
        this.deleteLoading = false;
        this.salaries = this.salaries.filter((salary: salary) => salary.id != this.deleteSalaryID
        );
        this.filterData();
      },
      (error) => {
        this.deleteLoading = false;
        this.appService.swalFire('An error occurred while deleting Salary Info', 'error');
      }
    );
  }

}
