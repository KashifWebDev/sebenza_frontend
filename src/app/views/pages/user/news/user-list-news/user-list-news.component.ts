import {Component, OnInit} from '@angular/core';
import {adminUser, News, User} from "../../../../../core/interfaces/interfaces";
import { ColumnMode } from '@swimlane/ngx-datatable';
import {AuthService} from "../../../auth/auth.service";
import {UserService} from "../../user.service";

@Component({
  selector: 'app-user-list-news',
  templateUrl: './user-list-news.component.html',
  styleUrls: ['./user-list-news.component.scss']
})
export class UserListNewsComponent implements OnInit {


  news: News[] = [];
  ColumnMode = ColumnMode;
  deleteLoading: boolean = false;
  filteredData: News[] = [...this.news];
  searchText = '';
  user: User | adminUser;


  constructor(private userService: UserService, private authService: AuthService) { }


  ngOnInit(): void {
    this.user = this.authService.currentUser;
    this.userService.getAllNewsByUserId(this.user.id).subscribe(response => {
      if (response.status && response.data) {
        this.news = response.data.news;
        this.filterData();
      }
    });
  }

  filterData() {
    if (this.searchText.trim() !== '') {
      const searchTerms = this.searchText.toLowerCase().split(' ');

      this.filteredData = this.news.filter(item => {
        const itemValues = Object.values(item).map(value => {
          if (value !== null && value !== undefined) {
            return value.toString().toLowerCase();
          }
          return '';
        });
        return searchTerms.every(term => itemValues.some(value => value.includes(term)));
      });
    } else {
      this.filteredData = [...this.news];
    }
  }

}
