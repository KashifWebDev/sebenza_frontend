import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {accountType, expense, Task} from "../../../../../core/interfaces/interfaces";
import {UserService} from "../../user.service";
import {AppService} from "../../../../../app.service";
import { ColumnMode } from '@swimlane/ngx-datatable';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.scss']
})
export class StatementComponent implements OnInit {

  expenses: expense[] = [];
  loading: boolean = true;

  ColumnMode = ColumnMode;
  deleteLoading: boolean = false;
  filteredData: expense[] = [...this.expenses];
  searchText = '';

  delExpenseId: number;
  modalReference: NgbModalRef;
  basicModalCloseResult: string = '';
  @ViewChild('basicModal', { static: true }) deleteModal: TemplateRef<any> | NgbModalRef;
  excelLoading: boolean = false;

  processExcel(){
    this.excelLoading = true;
    this.userService.exportExcel('expenses').subscribe(res => {
      window.location.href=res.data.excel.data_file;
      this.excelLoading = false;
    })
  }

  constructor(private userService: UserService, private appService: AppService,
              private modalService: NgbModal,) { }

  ngOnInit(): void {
    this.userService.getAllExpense().subscribe(
      response => {
        if(!response || !response.length){
          return
        }
        this.expenses = response;
        this.filterData();
        this.loading = false;
      },
      error => {
        this.appService.swalFire('No expense were found', 'info');
        this.loading = false;
      }
    );
  }

  filterData() {
    if (this.searchText.trim() !== '') {
      const searchTerms = this.searchText.toLowerCase().split(' ');

      this.filteredData = this.expenses.filter(item => {
        const itemValues = Object.values(item).map(value => {
          if (value !== null && value !== undefined) {
            return value.toString().toLowerCase();
          }
          return '';
        });
        return searchTerms.every(term => itemValues.some(value => value.includes(term)));
      });
    } else {
      this.filteredData = [...this.expenses];
    }
  }

  delAccType(id: number) {
    this.delExpenseId = id;
    this.modalReference = this.modalService.open(this.deleteModal, {});
  }

  confirmDelete(){
    this.deleteLoading = true;
    this.userService.deleteExpenseSubmit(this.delExpenseId).subscribe(
      data => {
        if(data.status){
          this.appService.swalFire('Expense Deleted Successfully', 'success');
          this.modalReference.close();
        }else{
          this.appService.swalFire(data.message, 'error');
        }
        this.deleteLoading = false;
        this.expenses = this.expenses.filter((expense: expense) => expense.id != this.delExpenseId);
        this.filterData();
      },
      (error) => {
        this.deleteLoading = false;
        this.appService.swalFire('An error occurred while expense', 'error');
      }
    );
  }

}
