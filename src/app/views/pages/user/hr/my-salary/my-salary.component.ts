import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../user.service";
import {AppService} from "../../../../../app.service";
import {salary} from "../../../../../core/interfaces/interfaces";

@Component({
  selector: 'app-my-salary',
  templateUrl: './my-salary.component.html',
  styleUrls: ['./my-salary.component.scss']
})
export class MySalaryComponent implements OnInit {

  salary: salary;
  loading: boolean = false

  constructor(private userService: UserService,
              private appService: AppService) { }

  ngOnInit(): void {
    this.loading = true;
    this.userService.getCurrentUserSalary().subscribe(
      (res) => {
        if(res.status && res.data?.salarys){
          this.salary = res.data.salarys;
          this.loading = false;
        }else{
          this.appService.swalFire(res.message, 'error');
        }
      },
      (error) => {
        this.appService.swalFire('An error was occurred while fetching salary details!', 'error');
      }
    );
  }

}
