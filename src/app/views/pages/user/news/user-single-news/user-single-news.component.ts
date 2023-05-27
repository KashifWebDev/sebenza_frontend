import { Component, OnInit } from '@angular/core';
import {News} from "../../../../../core/interfaces/interfaces";
import {ActivatedRoute} from "@angular/router";
import {AppService} from "../../../../../app.service";
import {UserService} from "../../user.service";

@Component({
  selector: 'app-user-single-news',
  templateUrl: './user-single-news.component.html',
  styleUrls: ['./user-single-news.component.scss']
})
export class UserSingleNewsComponent implements OnInit {

  news: News;
  slug: string;
  loading: boolean = false;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private appService: AppService) { }

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.slug = params['slug'];
      this.userService.getNewsBySlug(this.slug).subscribe(
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
