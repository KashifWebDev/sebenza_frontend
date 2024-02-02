import { Component, OnInit } from '@angular/core';
import {Router, RouteConfigLoadStart, RouteConfigLoadEnd, ActivatedRoute, NavigationEnd} from '@angular/router';
import {AuthService} from "../../pages/auth/auth.service";
import {filter} from "rxjs";

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  isLoading: boolean;
  bgImage: string;
  isDashboard: boolean = false;

  constructor(private router: Router, private authService: AuthService,
              private route: ActivatedRoute) {

    // Spinner for lazyload modules
    router.events.forEach((event) => {
      if (event instanceof RouteConfigLoadStart) {
        this.isLoading = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.isLoading = false;
      }
    });


  }

  ngOnInit(): void {
    switch (this.authService.getLoggedInUser()?.account_type) {
      case 'Event Planner':
        this.bgImage = 'https://i.ibb.co/r0dpPXc/photo-1492684223066-81342ee5ff30.jpg';
        break;
      case 'Logistics Company':
        this.bgImage = 'https://i.ibb.co/yVSyd3m/premium-photo-1672847671576-21241c8e28f2.jpg';
        break;
      case 'Law Firm':
        this.bgImage = 'https://i.ibb.co/qpqMk0K/photo-1505664194779-8beaceb93744.jpg';
        break;
      case 'Construction':
        this.bgImage = 'https://i.ibb.co/x29xW8w/con.jpg';
        break;
    }
    this.checkURL();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkURL();
      }
    });

  }

  checkURL(){
    //console.log(this.route.url);
    this.isDashboard = this.router.url === '/user/home';
  }

}
