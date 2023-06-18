import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {promoCode, WhatsApp} from "../../../../../../core/interfaces/interfaces";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {AdministratorService} from "../../../administrator.service";
import {AppService} from "../../../../../../app.service";
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-all-promocodes',
  templateUrl: './all-promocodes.component.html',
  styleUrls: ['./all-promocodes.component.scss']
})
export class AllPromocodesComponent implements OnInit {
  @ViewChild('dataTable') dataTable!: ElementRef;
  basicModalCloseResult: string = '';
  promoCodes: promoCode[] = [];

  @ViewChild('basicModal', { static: true }) deleteModal: TemplateRef<any> | NgbModalRef;
  ColumnMode = ColumnMode;
  deleteLoading: boolean = false;
  modalReference: NgbModalRef;
  filteredData: promoCode[] = [...this.promoCodes];
  searchText = '';
  delPromoCodeSingle: promoCode;

  constructor(private adminService: AdministratorService, private modalService: NgbModal,
              private appService: AppService) { }

  ngOnInit(): void {
    this.adminService.getPromoCodes().subscribe(response => {
      if (response.status && response.data?.promocodes) {
        this.promoCodes = response.data.promocodes;
        this.filterData();
      }
    });
  }

  filterData() {
    if (this.searchText.trim() !== '') {
      const searchTerms = this.searchText.toLowerCase().split(' ');

      this.filteredData = this.promoCodes.filter(item => {
        const itemValues = Object.values(item).map(value => {
          if (value !== null && value !== undefined) {
            return value.toString().toLowerCase();
          }
          return '';
        });
        return searchTerms.every(term => itemValues.some(value => value.includes(term)));
      });
    } else {
      this.filteredData = [...this.promoCodes];
    }
  }

  delPromoCode(pc: promoCode) {
    this.delPromoCodeSingle = pc;
    this.modalReference = this.modalService.open(this.deleteModal, {});
  }

  confirmDelete(){
    this.deleteLoading = true;
    this.adminService.deletePromoCodeSubmit(this.delPromoCodeSingle.id).subscribe(
      data => {
        if(data.status){
          this.appService.swalFire('Promo Code Deleted Successfully', 'success');
          this.modalReference.close();
        }else{
          this.appService.swalFire(data.message, 'error');
        }
        this.deleteLoading = false;
        this.promoCodes = this.promoCodes.filter((pc: promoCode) => pc.id != this.delPromoCodeSingle.id);
        this.filterData();
      },
      (error) => {
        this.deleteLoading = false;
        this.appService.swalFire('An error occurred while deleting promocode', 'error');
      }
    );
  }
}
