import { Component, OnInit } from '@angular/core';
import {order} from "../../../../../core/interfaces/interfaces";
import {AdministratorService} from "../../administrator.service";
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-admin-all-orders',
  templateUrl: './admin-all-orders.component.html',
  styleUrls: ['./admin-all-orders.component.scss']
})
export class AdminAllOrdersComponent implements OnInit {

  orders: order[] = [];
  ColumnMode = ColumnMode;
  deleteLoading: boolean = false;
  filteredData: order[] = [...this.orders];
  searchText = '';
  loading: boolean = true;

  constructor(private adminService: AdministratorService) { }

  ngOnInit(): void {
    this.adminService.getOrders().subscribe(response => {
      if (response.status && response.data?.orders) {
        this.orders = response.data.orders;
        console.log(response);
        this.filterData();
        this.loading = false;
      }else{
        console.log("No data");
      }
    });
  }

  filterData() {
    if (this.searchText.trim() !== '') {
      const searchTerms = this.searchText.toLowerCase().split(' ');

      this.filteredData = this.orders.filter(item => {
        const itemValues = Object.values(item).map(value => {
          if (value !== null && value !== undefined) {
            return value.toString().toLowerCase();
          }
          return '';
        });
        return searchTerms.every(term => itemValues.some(value => value.includes(term)));
      });
    } else {
      this.filteredData = [...this.orders];
    }
  }

  extractName(order: order): string{
    return order.users.first_name ? order.users.first_name+' '+order.users.last_name : 'user';
  }
}
