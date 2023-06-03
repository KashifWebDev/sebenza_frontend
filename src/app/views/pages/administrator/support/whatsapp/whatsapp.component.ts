import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {WhatsApp} from "../../../../../core/interfaces/interfaces";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {AdministratorService} from "../../administrator.service";
import {AppService} from "../../../../../app.service";
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-whatsapp',
  templateUrl: './whatsapp.component.html',
  styleUrls: ['./whatsapp.component.scss']
})
export class WhatsappComponent implements OnInit {
  @ViewChild('dataTable') dataTable!: ElementRef;
  basicModalCloseResult: string = '';
  whatsApps: WhatsApp[] = [];

  @ViewChild('basicModal', { static: true }) deleteModal: TemplateRef<any> | NgbModalRef;
  ColumnMode = ColumnMode;
  deleteLoading: boolean = false;
  modalReference: NgbModalRef;
  filteredData: WhatsApp[] = [...this.whatsApps];
  searchText = '';
  delWhatsApp: WhatsApp;

  constructor(private adminService: AdministratorService, private modalService: NgbModal,
              private appService: AppService) { }

  ngOnInit(): void {
    this.adminService.getWhatsappNumbers().subscribe(response => {
      if (response.status && response.data?.whatsapp) {
        this.whatsApps = response.data.whatsapp;
        this.filterData();
      }
    });
  }

  filterData() {
    if (this.searchText.trim() !== '') {
      const searchTerms = this.searchText.toLowerCase().split(' ');

      this.filteredData = this.whatsApps.filter(item => {
        const itemValues = Object.values(item).map(value => {
          if (value !== null && value !== undefined) {
            return value.toString().toLowerCase();
          }
          return '';
        });
        return searchTerms.every(term => itemValues.some(value => value.includes(term)));
      });
    } else {
      this.filteredData = [...this.whatsApps];
    }
  }

  delAccType(whatsapp: WhatsApp) {
    this.delWhatsApp = whatsapp;
    this.modalReference = this.modalService.open(this.deleteModal, {});
  }

  confirmDelete(){
    this.deleteLoading = true;
    this.adminService.deleteWhatsappSubmit(this.delWhatsApp.id).subscribe(
      data => {
        if(data.status){
          this.appService.swalFire('Whatsapp Deleted Successfully', 'success');
          this.modalReference.close();
        }else{
          this.appService.swalFire(data.message, 'error');
        }
        this.deleteLoading = false;
        this.whatsApps = this.whatsApps.filter((whatsapp: WhatsApp) => whatsapp.id != this.delWhatsApp.id);
        this.filterData();
      },
      (error) => {
        this.deleteLoading = false;
        this.appService.swalFire('An error occurred while deleting whatsapp', 'error');
      }
    );
  }
}
