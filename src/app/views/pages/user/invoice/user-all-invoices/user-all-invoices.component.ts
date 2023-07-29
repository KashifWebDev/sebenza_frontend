import { Component, OnInit } from '@angular/core';
import {invoice} from "../../../../../core/interfaces/interfaces";
import {UserService} from "../../user.service";
import {AuthService} from "../../../auth/auth.service";
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-user-all-invoices',
  templateUrl: './user-all-invoices.component.html',
  styleUrls: ['./user-all-invoices.component.scss']
})
export class UserAllInvoicesComponent implements OnInit {

  invoices: invoice[] = [];
  ColumnMode = ColumnMode;
  deleteLoading: boolean = false;
  filteredData: invoice[] = [...this.invoices];
  searchText = '';


  constructor(private userService: UserService) { }


  ngOnInit(): void {
    this.userService.getInvoices().subscribe(response => {
      if (response.status && response.data) {
        this.invoices = response.data.invoices;
        this.filterData();
      }
    });
  }

  filterData() {
    if (this.searchText.trim() !== '') {
      const searchTerms = this.searchText.toLowerCase().split(' ');

      this.filteredData = this.invoices.filter(item => {
        const itemValues = Object.values(item).map(value => {
          if (value !== null && value !== undefined) {
            return value.toString().toLowerCase();
          }
          return '';
        });
        return searchTerms.every(term => itemValues.some(value => value.includes(term)));
      });
    } else {
      this.filteredData = [...this.invoices];
    }
  }

}
