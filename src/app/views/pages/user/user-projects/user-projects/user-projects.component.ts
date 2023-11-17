import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
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
  projects: any[] = [];
  loading: boolean = true;

  ColumnMode = ColumnMode;
  deleteLoading: boolean = false;
  filteredData: any[] = [...this.projects];
  searchText = '';
  modalReference: NgbModalRef;
  @ViewChild('basicModal', { static: true }) editModal: TemplateRef<any> | NgbModalRef;
  @ViewChild('saveModalHtml', { static: true }) saveModalHtml: TemplateRef<any> | NgbModalRef;
  editProject: any | null = null;
  loadingBtn: boolean = false;
  editProjectForm: FormGroup;
  formProcessed: boolean = false;
  customers: any[] = [];
  excelLoading: boolean = false;

  processExcel(){
    this.excelLoading = true;
    this.userService.exportExcel('projects').subscribe(res => {
      window.location.href=res.data.excel.data_file;
      this.excelLoading = false;
    })
  }

  constructor(private userService: UserService, private appService: AppService,
              private modalService: NgbModal, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.fetchProjects();
    this.editProjectForm = this.formBuilder.group({
      customer_id: ['', Validators.required],
      project_title: ['', Validators.required],
      description: ['', Validators.required],
      phases: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      progress: ['', Validators.required],
      assign_to: ['', Validators.required],
      customer_can_view: ['', Validators.required],
      customer_can_comment: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required],
      title: ['', Validators.required],
      amount: ['', Validators.required],
      spent_by: ['', Validators.required],
      budget: ['', Validators.required],
    });

    this.userService.getCustomers().subscribe(data => {
      if(data.data?.customers && data.data.customers.length){
        this.customers = data.data.customers;
      }
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

  fetchProjects(){
    this.userService.getProjects().subscribe(
      res => {
        if(res.status && res.data?.projects.length){
          this.projects = res.data.projects;
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

  openDelModal(project: any){
    this.editProject = project;
    this.editProjectForm.patchValue({
      customer_id: project.customer_id,
      project_title: project.project_title,
      description: project.description,
      phases: project.phases,
      startDate: project.startDate,
      endDate: project.endDate,
      progress: project.progress,
      assign_to: project.assign_to,
      customer_can_view: project.customer_can_view,
      customer_can_comment: project.customer_can_comment,
      priority: project.priority,
      status: project.status,
      title: project.title,
      amount: project.amount,
      spent_by: project.spent_by,
      budget: project.budget
    });
    this.modalReference = this.modalService.open(this.editModal, {size: 'lg'});
  }

  confirmSaveModal(){

    this.formProcessed = true;
    this.formProcessed = true;
    if (this.editProjectForm.invalid) {
      this.formProcessed = false;
      console.log(this.editProjectForm.value);
      return;
    }

    let formData: FormData = new FormData();
    Object.keys(this.editProjectForm.controls).forEach(key => {
      const control = this.editProjectForm.get(key);
      if (control) {
        formData.append(key, control.value);
      }
    });

    if(this.editProject){
      this.userService.updateProject(this.editProject.id, formData).subscribe(
        data => {
          if(data.status){
            this.editProjectForm.reset();
            this.appService.swalFire('Project update successfully', 'success');
            this.fetchProjects();
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
      this.userService.addProject(formData).subscribe(
        data => {
          if(data.status){
            this.editProjectForm.reset();
            this.appService.swalFire('Project was added successfully', 'success');
            this.fetchProjects();
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
    this.modalReference = this.modalService.open(this.saveModalHtml, {size: 'lg'});
  }
}
