import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {withdraw} from "../../../../../core/interfaces/interfaces";
import { NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../../user.service";
import {AppService} from "../../../../../app.service";
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-withdraw-salary',
  templateUrl: './withdraw-salary.component.html',
  styleUrls: ['./withdraw-salary.component.scss']
})
export class WithdrawSalaryComponent implements OnInit {

  withdraws: withdraw[] = [];
  loading: boolean = true;

  ColumnMode = ColumnMode;
  deleteLoading: boolean = false;
  filteredData: withdraw[] = [...this.withdraws];
  searchText = '';
  modalReference: NgbModalRef;
  @ViewChild('basicModal', { static: true }) addTypeModal: TemplateRef<any> | NgbModalRef;


  constructor(private userService: UserService,
              private appService: AppService) { }

  ngOnInit(): void {
    this.fetchList();
  }

  fetchList(){
    this.userService.getCurrentUserWithdraws().subscribe(
      res => {
        if(res.status && res.data?.withdrews.length){
          this.withdraws = res.data.withdrews;
          this.filterData();
        }
        this.loading = false;
      },
      error => {
        this.appService.swalFire('Error occurred while getting withdraws', 'error');
        this.loading = false;
      }
    );
  }

  filterData() {
    if (this.searchText.trim() !== '') {
      const searchTerms = this.searchText.toLowerCase().split(' ');

      this.filteredData = this.withdraws.filter(item => {
        const itemValues = Object.values(item).map(value => {
          if (value !== null && value !== undefined) {
            return value.toString().toLowerCase();
          }
          return '';
        });
        return searchTerms.every(term => itemValues.some(value => value.includes(term)));
      });
    } else {
      this.filteredData = [...this.withdraws];
    }
  }
}
