import { Component, OnInit } from '@angular/core';
import {Meeting, Ticket} from "../../../../../core/interfaces/interfaces";
import {UserService} from "../../user.service";
import {AppService} from "../../../../../app.service";
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-all-meetings',
  templateUrl: './all-meetings.component.html',
  styleUrls: ['./all-meetings.component.scss']
})
export class AllMeetingsComponent implements OnInit {

  meetings: Meeting[] = [];
  loading: boolean = true;

  ColumnMode = ColumnMode;
  deleteLoading: boolean = false;
  filteredData: Meeting[] = [...this.meetings];
  searchText = '';

  constructor(private userService: UserService, private appService: AppService) { }

  ngOnInit(): void {
    this.userService.getMeetings().subscribe(
      res => {
        if(res.status && res.data?.metings.length){
          this.meetings = res.data.metings;
          this.filterData();
        }
        this.loading = false;
      },
      error => {
        this.appService.swalFire('Error occurred while listing meetings', 'error');
        this.loading = false;
      }
    );
  }

  filterData() {
    if (this.searchText.trim() !== '') {
      const searchTerms = this.searchText.toLowerCase().split(' ');

      this.filteredData = this.meetings.filter(item => {
        const itemValues = Object.values(item).map(value => {
          if (value !== null && value !== undefined) {
            return value.toString().toLowerCase();
          }
          return '';
        });
        return searchTerms.every(term => itemValues.some(value => value.includes(term)));
      });
    } else {
      this.filteredData = [...this.meetings];
    }
  }

}
