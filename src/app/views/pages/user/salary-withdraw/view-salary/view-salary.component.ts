import { Component, OnInit } from '@angular/core';
import {UserService} from "../../user.service";
import {AppService} from "../../../../../app.service";
import {salary} from "../../../../../core/interfaces/interfaces";

@Component({
  selector: 'app-view-salary',
  templateUrl: './view-salary.component.html',
  styleUrls: ['./view-salary.component.scss']
})
export class ViewSalaryComponent implements OnInit {

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
