import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../user.service";
import {AppService} from "../../../../../app.service";
import {withdraw} from "../../../../../core/interfaces/interfaces";

@Component({
  selector: 'app-single-withdraw',
  templateUrl: './single-withdraw.component.html',
  styleUrls: ['./single-withdraw.component.scss']
})
export class SingleWithdrawComponent implements OnInit {

  withdraw: withdraw;
  withdrawID: number;
  loading: boolean = false;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private appService: AppService) { }

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.withdrawID = params['id'];
      this.userService.fetchSingleWithdraw(this.withdrawID).subscribe(
        (res) => {
          if(res.status && res.data?.withdrews){
            this.withdraw = res.data.withdrews;
            this.loading = false;
          }else{
            this.appService.swalFire(res.message, 'error');
          }
        },
        (error) => {
          this.appService.swalFire('An error was occurred while fetching withdraw details!', 'error');
        }
      );
    });
  }

}
