import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {News, User} from "../../../../../core/interfaces/interfaces";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {AdministratorService} from "../../administrator.service";
import {AppService} from "../../../../../app.service";
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-list-all-news',
  templateUrl: './list-all-news.component.html',
  styleUrls: ['./list-all-news.component.scss']
})
export class ListAllNewsComponent implements OnInit {


  news: News[] = [];
  newsDelete: News;
  @ViewChild('basicModal', { static: true }) deleteModal: TemplateRef<any> | NgbModalRef;
  ColumnMode = ColumnMode;
  deleteLoading: boolean = false;
  modalReference: NgbModalRef;
  filteredData: News[] = [...this.news];
  searchText = '';


  constructor(private adminService: AdministratorService, private modalService: NgbModal,
              private appService: AppService) { }


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

  deleteRole(news: News) {
    this.newsDelete = news;
    this.modalReference = this.modalService.open(this.deleteModal, {});
  }

  confirmDelete(){
    this.deleteLoading = true;
    this.adminService.deleteUserSubmit(this.newsDelete.id).subscribe(
      data => {
        if(data.status){
          this.appService.swalFire('News Deleted Successfully', 'success');
          this.modalReference.close();
        }else{
          this.appService.swalFire(data.message, 'error');
        }
        this.deleteLoading = false;
        this.news = this.news.filter((news: News) => news.id != this.newsDelete.id);
        this.filterData();
      },
      (error) => {
        this.deleteLoading = false;
        this.appService.swalFire('An error occurred while deleting News', 'error');
      }
    );
  }

}
