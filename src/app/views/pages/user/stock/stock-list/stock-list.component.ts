import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../user.service";
import {AppService} from "../../../../../app.service";
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {
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
    this.getStocks();
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

  getStocks(){
    this.userService.getStock().subscribe(
      res => {
        if(res.status && res.data?.stocks.length){
          this.stocks = res.data.stocks;
          this.filterData();
        }
        this.loading = false;
      },
      error => {
        this.appService.swalFire('Error occurred while listing stock', 'error');
        this.loading = false;
      }
    );
  }
}
