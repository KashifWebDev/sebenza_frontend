import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../auth/auth.service";
import {invoice, User} from "../../../../../core/interfaces/interfaces";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../user.service";
import {AppService} from "../../../../../app.service";

@Component({
  selector: 'app-user-single-invoice',
  templateUrl: './user-single-invoice.component.html',
  styleUrls: ['./user-single-invoice.component.scss']
})
export class UserSingleInvoiceComponent implements OnInit {

  user: User;
  invoice: invoice;
  invoiceID: number;
  loading: boolean = false;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private appService: AppService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.currentUser;
    this.loading = true;
    this.route.params.subscribe(params => {
      this.invoiceID = parseInt(params['id']);
      this.userService.getInvoiceByID(this.invoiceID).subscribe(
        (res) => {
          if(res.status && res.data?.invoices){
            this.invoice = res.data.invoices;
            this.loading = false;
          }else{
            this.appService.swalFire(res.message, 'error');
          }
        },
        (error) => {
          this.appService.swalFire('An error was occurred while fetching Invoice details!', 'error');
        }
      );
    });
  }

  calculateTotal(total: string, discount: string): number{
    return parseFloat(total)-parseFloat(discount);
  }

}
