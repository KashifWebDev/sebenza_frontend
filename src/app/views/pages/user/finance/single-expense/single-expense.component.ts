import { Component, OnInit } from '@angular/core';
import {expense} from "../../../../../core/interfaces/interfaces";
import {ActivatedRoute} from "@angular/router";
import {AppService} from "../../../../../app.service";
import {UserService} from "../../user.service";

@Component({
  selector: 'app-single-expense',
  templateUrl: './single-expense.component.html',
  styleUrls: ['./single-expense.component.scss']
})
export class SingleExpenseComponent implements OnInit {

  expense: expense;
  expenseID: number;
  loading: boolean = false;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private appService: AppService) { }

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.expenseID = +params['id'];
      const user = this.userService.getSingleExpense(this.expenseID).subscribe(
        (res) => {
          if(res.status && res.data?.expenses){
            this.expense = res.data.expenses;
            this.loading = false;
          }else{
            this.appService.swalFire(res.message, 'error');
          }
        },
        (error) => {
          this.appService.swalFire('An error was occurred while fetching expense details!', 'error');
        }
      );
    });
  }

}
