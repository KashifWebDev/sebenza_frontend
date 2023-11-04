import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import {customer} from "../../../../../core/interfaces/interfaces";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {AppService} from "../../../../../app.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../user.service";

@Component({
  selector: 'app-user-customers',
  templateUrl: './user-customers.component.html',
  styleUrls: ['./user-customers.component.scss']
})
export class UserCustomersComponent implements OnInit {
  customers: customer[] = [];
  loading: boolean = true;

  ColumnMode = ColumnMode;
  deleteLoading: boolean = false;
  filteredData: customer[] = [...this.customers];
  searchText = '';
  modalReference: NgbModalRef;
  @ViewChild('basicModal', { static: true }) editModal: TemplateRef<any> | NgbModalRef;
  @ViewChild('saveModalHtml', { static: true }) saveModalHtml: TemplateRef<any> | NgbModalRef;
  editWarehouse: customer | null = null;
  loadingBtn: boolean = false;
  editCustomerForm: FormGroup;
  formProcessed: boolean = false;

  constructor(private userService: UserService, private appService: AppService,
              private modalService: NgbModal, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.fetchCustomers();
    this.editCustomerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      company_name: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  filterData() {
    if (this.searchText.trim() !== '') {
      const searchTerms = this.searchText.toLowerCase().split(' ');

      this.filteredData = this.customers.filter((item: any) => {
        const itemValues = Object.values(item).map((value: any) => {
          if (value !== null && value !== undefined) {
            return value.toString().toLowerCase();
          }
          return '';
        });
        return searchTerms.every(term => itemValues.some(value => value.includes(term)));
      });
    } else {
      this.filteredData = [...this.customers];
    }
  }

  fetchCustomers(){
    this.userService.getCustomers().subscribe(
      res => {
        if(res.status && res.data?.customers.length){
          this.customers = res.data.customers;
          this.filterData();
        }
        this.loading = false;
      },
      error => {
        this.appService.swalFire('Error occurred while listing customers', 'error');
        this.loading = false;
      }
    );
  }

  get form() {
    return this.editCustomerForm.controls;
  }

  openDelModal(warehouse: customer){
    this.editWarehouse = warehouse;
    this.editCustomerForm.patchValue({
      name: warehouse.name,
      email: warehouse.email,
      password: warehouse.password,
      company_name: warehouse.company_name,
      status: warehouse.status
    });
    this.modalReference = this.modalService.open(this.editModal, {});
  }

  confirmSaveModal(){
    this.loadingBtn = true;

    let formData: FormData = new FormData();
    formData.append('name', this.editCustomerForm.controls['name'].value);
    formData.append('email', this.editCustomerForm.controls['email'].value);
    formData.append('password', this.editCustomerForm.controls['password'].value);
    formData.append('company_name', this.editCustomerForm.controls['company_name'].value);
    formData.append('status', this.editCustomerForm.controls['status'].value);

    if(this.editWarehouse){
      this.userService.updateCustomer(this.editWarehouse.id, formData).subscribe(
        data => {
          if(data.status){
            this.editCustomerForm.reset();
            this.appService.swalFire('Customer update successfully', 'success');
            this.fetchCustomers();
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
      this.userService.addCustomer(formData).subscribe(
        data => {
          if(data.status){
            this.editCustomerForm.reset();
            this.appService.swalFire('Customer was added successfully', 'success');
            this.fetchCustomers();
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
    this.editCustomerForm.reset();
    this.editWarehouse = null;
    this.modalReference = this.modalService.open(this.saveModalHtml, {});
  }
}
