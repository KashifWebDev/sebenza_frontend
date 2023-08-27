import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../user.service";
import {AppService} from "../../../../../app.service";
import {order, salary} from "../../../../../core/interfaces/interfaces";

@Component({
  selector: 'app-view-single-salary',
  templateUrl: './view-single-salary.component.html',
  styleUrls: ['./view-single-salary.component.scss']
})
export class ViewSingleSalaryComponent implements OnInit {

  salary: salary;
  salaryID: number;
  loading: boolean = false;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private appService: AppService) { }

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.salaryID = params['id'];
      this.userService.fetchSingleSalary(this.salaryID).subscribe(
        (res) => {
          if(res.status && res.data?.salarys){
            this.salary = res.data.salarys;
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
