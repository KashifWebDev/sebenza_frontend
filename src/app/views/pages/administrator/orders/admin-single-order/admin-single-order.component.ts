import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppService} from "../../../../../app.service";
import {order} from "../../../../../core/interfaces/interfaces";
import {AdministratorService} from "../../administrator.service";

@Component({
  selector: 'app-admin-single-order',
  templateUrl: './admin-single-order.component.html',
  styleUrls: ['./admin-single-order.component.scss']
})
export class AdminSingleOrderComponent implements OnInit {

  order: order;
  orderID: number;
  loading: boolean = false;

  constructor(private route: ActivatedRoute,
              private adminService: AdministratorService,
              private appService: AppService) { }

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.orderID = params['id'];
      this.adminService.getSingleOrder(this.orderID).subscribe(
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
