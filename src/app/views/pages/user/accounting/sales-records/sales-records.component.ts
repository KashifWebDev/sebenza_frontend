import { Component, OnInit } from '@angular/core';
import {ColumnMode} from "@swimlane/ngx-datatable";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../user.service";
import {AppService} from "../../../../../app.service";

@Component({
  selector: 'app-sales-records',
  templateUrl: './sales-records.component.html',
  styleUrls: ['./sales-records.component.scss']
})
export class SalesRecordsComponent implements OnInit {


  stocks: any[] = [];
  loading: boolean = false;
  showData: boolean = false;

  ColumnMode = ColumnMode;
  filteredData: any[] = [...this.stocks];
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

      this.filteredData = this.stocks.filter(item => {
        const itemValues = Object.values(item).map((value: any) => {
          if (value !== null && value !== undefined) {
            return value.toString().toLowerCase();
          }
          return '';
        });
        return searchTerms.every(term => itemValues.some(value => value.includes(term)));
      });
    } else {
      this.filteredData = [...this.stocks];
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

    this.userService.accountingSales(fd).subscribe(
      res => {
        if(res.status && res.data?.sales.length){
          this.stocks = res.data.sales;
          this.filterData();
        }
        this.loading = false;
      },
      error => {
        this.appService.swalFire('Error occurred while listing Sales', 'error');
        this.loading = false;
      }
    );

  }
}
