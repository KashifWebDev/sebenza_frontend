import { Component, OnInit } from '@angular/core';
import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../../user.service";
import {AppService} from "../../../../../app.service";
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-list-pos',
  templateUrl: './list-pos.component.html',
  styleUrls: ['./list-pos.component.scss']
})
export class ListPosComponent implements OnInit {
  stocks: any[] = [];
  loading: boolean = true;

  ColumnMode = ColumnMode;
  deleteLoading: boolean = false;
  filteredData: any[] = [...this.stocks];
  searchText = '';
  modalReference: NgbModalRef;
  loadingBtn: boolean = false;
  formProcessed: boolean = false;

  constructor(private userService: UserService, private appService: AppService) { }

  ngOnInit(): void {
    this.getSalesPOS();
  }

  filterData() {
    if (this.searchText.trim() !== '') {
      const searchTerms = this.searchText.toLowerCase().split(' ');

      this.filteredData = this.stocks.filter((item: any) => {
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

  getSalesPOS(){
    this.userService.getPOS().subscribe(
      res => {
        if(res.status && res.data?.sales.length){
          this.stocks = res.data.sales;
          this.filterData();
        }
        this.loading = false;
      },
      error => {
        this.appService.swalFire('Error occurred while listing sales', 'error');
        this.loading = false;
      }
    );
  }
}
