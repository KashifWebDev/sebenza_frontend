import { Component, OnInit } from '@angular/core';
import {News} from "../../../../../core/interfaces/interfaces";
import {ActivatedRoute} from "@angular/router";
import {AdministratorService} from "../../../administrator/administrator.service";
import {AppService} from "../../../../../app.service";

@Component({
  selector: 'app-user-single-news',
  templateUrl: './user-single-news.component.html',
  styleUrls: ['./user-single-news.component.scss']
})
export class UserSingleNewsComponent implements OnInit {

  news: News;
  newsID: number;
  loading: boolean = false;

  constructor(private route: ActivatedRoute,
              private adminService: AdministratorService,
              private appService: AppService) { }

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.newsID = +params['id'];
      const user = this.adminService.getNewsByID(this.newsID).subscribe(
        (res) => {
          if(res.status && res.data?.news){
            this.news = res.data.news;
            this.loading = false;
          }else{
            this.appService.swalFire(res.message, 'error');
          }
        },
        (error) => {
          this.appService.swalFire('An error was occurred while fetching user details!', 'error');
        }
      );
    });
  }

}
