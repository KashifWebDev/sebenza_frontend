import { Component, OnInit } from '@angular/core';
import {invoice} from "../../../../../core/interfaces/interfaces";
import { ColumnMode } from '@swimlane/ngx-datatable';
import {AdministratorService} from "../../administrator.service";

@Component({
  selector: 'app-admin-all-invoices',
  templateUrl: './admin-all-invoices.component.html',
  styleUrls: ['./admin-all-invoices.component.scss']
})
export class AdminAllInvoicesComponent implements OnInit {

  invoices: invoice[] = [];
  ColumnMode = ColumnMode;
  deleteLoading: boolean = false;
  filteredData: invoice[] = [...this.invoices];
  searchText = '';

  constructor(private adminService: AdministratorService) { }

  ngOnInit(): void {
    this.adminService.getInvoices().subscribe(response => {
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
