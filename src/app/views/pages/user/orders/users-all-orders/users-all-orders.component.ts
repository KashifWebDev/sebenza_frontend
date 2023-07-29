import { Component, OnInit } from '@angular/core';
import {UserService} from "../../user.service";
import {order} from "../../../../../core/interfaces/interfaces";

@Component({
  selector: 'app-users-all-orders',
  templateUrl: './users-all-orders.component.html',
  styleUrls: ['./users-all-orders.component.scss']
})
export class UsersAllOrdersComponent implements OnInit {

  order: order;
  loading: boolean = true;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getOrders().subscribe(response => {
      if (response.status && response.data?.order) {
        this.order = response.data.order;
        this.loading = false;
      }
    });
  }

  modifyDate(date: string){
    return date.split('T')[0];
  }
}
