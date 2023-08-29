import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {User, withdraw} from "../../../../../core/interfaces/interfaces";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../../user.service";
import {AppService} from "../../../../../app.service";
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-withdraw-requests',
  templateUrl: './withdraw-requests.component.html',
  styleUrls: ['./withdraw-requests.component.scss']
})
export class WithdrawRequestsComponent implements OnInit {

  withdraws: withdraw[] = [];
  loading: boolean = true;

  ColumnMode = ColumnMode;
  deleteLoading: boolean = false;
  filteredData: withdraw[] = [...this.withdraws];
  searchText = '';
  modalReference: NgbModalRef;
  @ViewChild('basicModal', { static: true }) editDetailsModal: TemplateRef<any> | NgbModalRef;
  editRequest: withdraw


  constructor(private userService: UserService,
              private modalService: NgbModal,
              private appService: AppService) { }

  ngOnInit(): void {
    this.fetchList();
  }

  fetchList(){
    this.userService.getAllWithdraws().subscribe(
      res => {
        if(res.status && res.data?.withdrews.length){
          this.withdraws = res.data.withdrews;
          this.filterData();
        }
        this.loading = false;
      },
      error => {
        this.appService.swalFire('Error occurred while getting withdraws', 'error');
        this.loading = false;
      }
    );
  }

  filterData() {
    if (this.searchText.trim() !== '') {
      const searchTerms = this.searchText.toLowerCase().split(' ');

      this.filteredData = this.withdraws.filter(item => {
        const itemValues = Object.values(item).map(value => {
          if (value !== null && value !== undefined) {
            return value.toString().toLowerCase();
          }
          return '';
        });
        return searchTerms.every(term => itemValues.some(value => value.includes(term)));
      });
    } else {
      this.filteredData = [...this.withdraws];
    }
  }

  editDetails(editRequest: withdraw) {
    this.editRequest = editRequest;
    this.modalReference = this.modalService.open(this.editDetailsModal, {});
  }

  confirmUpdateStatus(status: string){
    this.deleteLoading = true;
    const formData = new FormData();
    formData.append('status', status);
    this.userService.updateWithdrawRequest(formData, this.editRequest.id).subscribe(
      data => {
        if(data.status){
          this.appService.swalFire(`Payment was ${status}`, 'success');
          this.modalReference.close();
        }else{
          this.appService.swalFire(data.message, 'error');
        }
        this.deleteLoading = false;
        this.fetchList();
      },
      (error) => {
        this.deleteLoading = false;
        this.appService.swalFire('An error occurred while processing request', 'error');
      }
    );
  }
}
