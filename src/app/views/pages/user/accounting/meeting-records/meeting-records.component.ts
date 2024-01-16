import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import {UserService} from "../../user.service";
import {AppService} from "../../../../../app.service";
import {Meeting} from "../../../../../core/interfaces/interfaces";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-meeting-records',
  templateUrl: './meeting-records.component.html',
  styleUrls: ['./meeting-records.component.scss']
})
export class MeetingRecordsComponent implements OnInit {

  meetings: Meeting[] = [];
  loading: boolean = false;
  showData: boolean = false;

  ColumnMode = ColumnMode;
  filteredData: Meeting[] = [...this.meetings];
  searchText = '';

  selectedDate: NgbDateStruct;
  searchForm: FormGroup;

  constructor(private userService: UserService, private appService: AppService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
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

  getData(){
    this.loading = true;
    this.showData = true;
    let start = this.searchForm.controls['startDate'].value;
    let end = this.searchForm.controls['endDate'].value;
    let fd = new FormData();
    fd.set('startDate', start.year+'-'+start.month+'-'+start.day);
    fd.set('endDate', end.year+'-'+end.month+'-'+end.day);

    this.userService.accountingMeeting(fd).subscribe(
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

}
