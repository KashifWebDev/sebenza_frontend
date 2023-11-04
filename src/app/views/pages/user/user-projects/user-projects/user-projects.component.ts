import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {customer} from "../../../../../core/interfaces/interfaces";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../user.service";
import {AppService} from "../../../../../app.service";
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-user-projects',
  templateUrl: './user-projects.component.html',
  styleUrls: ['./user-projects.component.scss']
})
export class UserProjectsComponent implements OnInit {
  projects: customer[] = [];
  loading: boolean = true;

  ColumnMode = ColumnMode;
  deleteLoading: boolean = false;
  filteredData: customer[] = [...this.projects];
  searchText = '';
  modalReference: NgbModalRef;
  @ViewChild('basicModal', { static: true }) editModal: TemplateRef<any> | NgbModalRef;
  @ViewChild('saveModalHtml', { static: true }) saveModalHtml: TemplateRef<any> | NgbModalRef;
  editProject: customer | null = null;
  loadingBtn: boolean = false;
  editProjectForm: FormGroup;
  formProcessed: boolean = false;

  constructor(private userService: UserService, private appService: AppService,
              private modalService: NgbModal, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.fetchCustomers();
    this.editProjectForm = this.formBuilder.group({
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

      this.filteredData = this.projects.filter((item: any) => {
        const itemValues = Object.values(item).map((value: any) => {
          if (value !== null && value !== undefined) {
            return value.toString().toLowerCase();
          }
          return '';
        });
        return searchTerms.every(term => itemValues.some(value => value.includes(term)));
      });
    } else {
      this.filteredData = [...this.projects];
    }
  }

  fetchCustomers(){
    this.userService.getCustomers().subscribe(
      res => {
        if(res.status && res.data?.customers.length){
          this.projects = res.data.customers;
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
    return this.editProjectForm.controls;
  }

  openDelModal(warehouse: customer){
    this.editProject = warehouse;
    this.editProjectForm.patchValue({
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
    formData.append('name', this.editProjectForm.controls['name'].value);
    formData.append('email', this.editProjectForm.controls['email'].value);
    formData.append('password', this.editProjectForm.controls['password'].value);
    formData.append('company_name', this.editProjectForm.controls['company_name'].value);
    formData.append('status', this.editProjectForm.controls['status'].value);

    if(this.editProject){
      this.userService.updateCustomer(this.editProject.id, formData).subscribe(
        data => {
          if(data.status){
            this.editProjectForm.reset();
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
            this.editProjectForm.reset();
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
    this.editProjectForm.reset();
    this.editProject = null;
    this.modalReference = this.modalService.open(this.saveModalHtml, {});
  }
}
