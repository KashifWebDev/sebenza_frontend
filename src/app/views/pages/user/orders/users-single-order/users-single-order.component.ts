import { Component, OnInit } from '@angular/core';
import {order} from "../../../../../core/interfaces/interfaces";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../user.service";
import {AppService} from "../../../../../app.service";

@Component({
  selector: 'app-users-single-order',
  templateUrl: './users-single-order.component.html',
  styleUrls: ['./users-single-order.component.scss']
})
export class UsersSingleOrderComponent implements OnInit {

  order: order;
  orderID: number;
  loading: boolean = false;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private appService: AppService) { }

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.orderID = params['id'];
      this.userService.getSingleOrder(this.orderID).subscribe(
        (res) => {
          if(res.status && res.data?.order){
            this.order = res.data.order;
            this.loading = false;
          }else{
            this.appService.swalFire(res.message, 'error');
          }
        },
        (error) => {
          this.appService.swalFire('An error was occurred while fetching order details!', 'error');
        }
      );
    });
  }

}
