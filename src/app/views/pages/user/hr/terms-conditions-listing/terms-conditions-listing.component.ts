import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {expense, termsCondition} from "../../../../../core/interfaces/interfaces";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../../user.service";
import {AppService} from "../../../../../app.service";
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-terms-conditions-listing',
  templateUrl: './terms-conditions-listing.component.html',
  styleUrls: ['./terms-conditions-listing.component.scss']
})
export class TermsConditionsListingComponent implements OnInit {

  terms: termsCondition[] = [];
  loading: boolean = true;

  ColumnMode = ColumnMode;
  deleteLoading: boolean = false;
  filteredData: termsCondition[] = [...this.terms];
  searchText = '';

  delTermID: number;
  modalReference: NgbModalRef;
  basicModalCloseResult: string = '';
  @ViewChild('basicModal', { static: true }) deleteModal: TemplateRef<any> | NgbModalRef;

  constructor(private userService: UserService, private appService: AppService,
              private modalService: NgbModal,) { }

  ngOnInit(): void {
    this.userService.getTermsConditions().subscribe(
      response => {
        if(response.status && response.data?.termsconditions){
          this.terms = response.data.termsconditions;
          this.filterData();
          this.loading = false;
        }
      },
      error => {
        this.appService.swalFire('No terms were found', 'info');
        this.loading = false;
      }
    );
  }

  filterData() {
    if (this.searchText.trim() !== '') {
      const searchTerms = this.searchText.toLowerCase().split(' ');

      this.filteredData = this.terms.filter(item => {
        const itemValues = Object.values(item).map(value => {
          if (value !== null && value !== undefined) {
            return value.toString().toLowerCase();
          }
          return '';
        });
        return searchTerms.every(term => itemValues.some(value => value.includes(term)));
      });
    } else {
      this.filteredData = [...this.terms];
    }
  }

  delAccType(id: number) {
    this.delTermID = id;
    this.modalReference = this.modalService.open(this.deleteModal, {});
  }

  confirmDelete(){
    this.deleteLoading = true;
    this.userService.deleteTermsConditions(this.delTermID).subscribe(
      data => {
        if(data.status){
          this.appService.swalFire('Term Deleted Successfully', 'success');
          this.modalReference.close();
        }else{
          this.appService.swalFire(data.message, 'error');
        }
        this.deleteLoading = false;
        this.terms = this.terms.filter((term: termsCondition) => term.id != this.delTermID);
        this.filterData();
      },
      (error) => {
        this.deleteLoading = false;
        this.appService.swalFire('An error occurred while processing request', 'error');
      }
    );
  }

}
