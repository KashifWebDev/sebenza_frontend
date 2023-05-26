import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {News} from "../../../../../core/interfaces/interfaces";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {AdministratorService} from "../../../administrator/administrator.service";
import { ColumnMode } from '@swimlane/ngx-datatable';

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


  constructor(private adminService: AdministratorService, private modalService: NgbModal) { }


  ngOnInit(): void {
    this.adminService.getAllNews().subscribe(response => {
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
