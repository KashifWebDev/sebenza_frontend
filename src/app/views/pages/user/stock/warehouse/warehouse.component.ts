import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {warehouse} from "../../../../../core/interfaces/interfaces";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../user.service";
import {AppService} from "../../../../../app.service";
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit {
  warehouses: warehouse[] = [];
  loading: boolean = true;

  ColumnMode = ColumnMode;
  deleteLoading: boolean = false;
  filteredData: warehouse[] = [...this.warehouses];
  searchText = '';
  modalReference: NgbModalRef;
  @ViewChild('basicModal', { static: true }) editModal: TemplateRef<any> | NgbModalRef;
  @ViewChild('saveModalHtml', { static: true }) saveModalHtml: TemplateRef<any> | NgbModalRef;
  editWarehouse: warehouse | null = null;
  loadingBtn: boolean = false;
  editWarehouseForm: FormGroup;
  formProcessed: boolean = false;

  constructor(private userService: UserService, private appService: AppService,
              private modalService: NgbModal, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.fetchWarehouses();
    this.editWarehouseForm = this.formBuilder.group({
      title: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      total_qty: ['', Validators.required],
      total_transfer: ['', Validators.required],
      available_qty: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  filterData() {
    if (this.searchText.trim() !== '') {
      const searchTerms = this.searchText.toLowerCase().split(' ');

      this.filteredData = this.warehouses.filter((item: any) => {
        const itemValues = Object.values(item).map((value: any) => {
          if (value !== null && value !== undefined) {
            return value.toString().toLowerCase();
          }
          return '';
        });
        return searchTerms.every(term => itemValues.some(value => value.includes(term)));
      });
    } else {
      this.filteredData = [...this.warehouses];
    }
  }

  fetchWarehouses(){
    this.userService.getWarehosues().subscribe(
      res => {
        if(res.status && res.data?.warehouses.length){
          this.warehouses = res.data.warehouses;
          this.filterData();
        }
        this.loading = false;
      },
      error => {
        this.appService.swalFire('Error occurred while listing warehouses', 'error');
        this.loading = false;
      }
    );
  }

  get form() {
    return this.editWarehouseForm.controls;
  }

  openDelModal(warehouse: warehouse){
    this.editWarehouse = warehouse;
    this.editWarehouseForm.patchValue({
      title: warehouse.title,
      country: warehouse.country,
      city: warehouse.city,
      total_qty: warehouse.total_qty,
      total_transfer: warehouse.total_transfer,
      available_qty: warehouse.available_qty,
      status: warehouse.status
    });
    this.modalReference = this.modalService.open(this.editModal, {});
  }

  confirmSaveModal(){
    this.loadingBtn = true;

    let formData: FormData = new FormData();
    formData.append('title', this.editWarehouseForm.controls['title'].value);
    formData.append('country', this.editWarehouseForm.controls['country'].value);
    formData.append('city', this.editWarehouseForm.controls['city'].value);
    formData.append('total_qty', this.editWarehouseForm.controls['total_qty'].value);
    formData.append('total_transfer', this.editWarehouseForm.controls['total_transfer'].value);
    formData.append('available_qty', this.editWarehouseForm.controls['available_qty'].value);
    formData.append('status', this.editWarehouseForm.controls['status'].value);

    if(this.editWarehouse){
      this.userService.updateWarehosue(this.editWarehouse.id, formData).subscribe(
        data => {
          if(data.status){
            this.editWarehouseForm.reset();
            this.appService.swalFire('Product update successfully', 'success');
            this.fetchWarehouses();
            this.modalReference.close();
          }else{
            this.appService.swalFire(data.message, 'error');
          }
          this.loadingBtn = false;
        },
        (error) => {
          this.loadingBtn = false;
          this.appService.swalFire('An error occurred while performing action', 'error');
        }
      );
    }else{
      this.userService.addWarehosue(formData).subscribe(
        data => {
          if(data.status){
            this.editWarehouseForm.reset();
            this.appService.swalFire('Warehouse added successfully', 'success');
            this.fetchWarehouses();
            this.modalReference.close();
          }else{
            this.appService.swalFire(data.message, 'error');
          }
          this.loadingBtn = false;
        },
        (error) => {
          this.loadingBtn = false;
          this.appService.swalFire('An error occurred while performing action', 'error');
        }
      );
    }
  }

  saveModal(){
    this.editWarehouseForm.reset();
    this.editWarehouse = null;
    this.modalReference = this.modalService.open(this.saveModalHtml, {});
  }
}
