import { Component, OnInit } from '@angular/core';
import {UserService} from "../../user.service";
import {AppService} from "../../../../../app.service";
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-list-cases',
  templateUrl: './list-cases.component.html',
  styleUrls: ['./list-cases.component.scss']
})
export class ListCasesComponent implements OnInit {
  quotes: any = [];
  loading: boolean = true;

  ColumnMode = ColumnMode;
  deleteLoading: boolean = false;
  filteredData: any[] = [...this.quotes];
  searchText = '';

  constructor(private userService: UserService, private appService: AppService) { }

  ngOnInit(): void {
    this.userService.getQuotes().subscribe(
      res => {
        if(res.status && res.data?.estimatequotes.length){
          this.quotes = res.data.estimatequotes;
          this.filterData();
        }
        this.loading = false;
      },
      error => {
        this.appService.swalFire('Error occurred while listing tasks', 'error');
        this.loading = false;
      }
    );
  }

  filterData() {
    if (this.searchText.trim() !== '') {
      const searchTerms = this.searchText.toLowerCase().split(' ');

      this.filteredData = this.quotes.filter((item: any) => {
        const itemValues = Object.values(item).map((value: any) => {
          if (value !== null && value !== undefined) {
            return value.toString().toLowerCase();
          }
          return '';
        });
        return searchTerms.every(term => itemValues.some(value => value.includes(term)));
      });
    } else {
      this.filteredData = [...this.quotes];
    }
  }
}
