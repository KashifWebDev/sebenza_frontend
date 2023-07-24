import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {expenseType} from "../../../../../core/interfaces/interfaces";
import {UserService} from "../../user.service";
import {AppService} from "../../../../../app.service";
import { ColumnMode } from '@swimlane/ngx-datatable';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-expense-types',
  templateUrl: './expense-types.component.html',
  styleUrls: ['./expense-types.component.scss']
})
export class ExpenseTypesComponent implements OnInit {

  expenseTypes: expenseType[] = [];
  loading: boolean = true;

  ColumnMode = ColumnMode;
  deleteLoading: boolean = false;
  filteredData: expenseType[] = [...this.expenseTypes];
  searchText = '';
  modalReference: NgbModalRef;
  @ViewChild('basicModal', { static: true }) addTypeModal: TemplateRef<any> | NgbModalRef;

  isEditMode: boolean = false;
  formSubmit: boolean = false;
  formProcessed: boolean = false;
  formData: FormData = new FormData();
  loadingBtn: boolean = false;
  addTypeForm: FormGroup;

  constructor(private userService: UserService,
              private appService: AppService,
              private modalService: NgbModal,
              private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.fetchList();

    this.addTypeForm = this.formBuilder.group({
      expName: ['', Validators.required]
    });
  }

  fetchList(){
    this.userService.getExpenseTypes().subscribe(
      res => {
        if(res.status && res.data?.expensetypes.length){
          this.expenseTypes = res.data.expensetypes;
          this.filterData();
        }
        this.loading = false;
      },
      error => {
        this.appService.swalFire('Error occurred while getting expense types', 'error');
        this.loading = false;
      }
    );
  }

  filterData() {
    if (this.searchText.trim() !== '') {
      const searchTerms = this.searchText.toLowerCase().split(' ');

      this.filteredData = this.expenseTypes.filter(item => {
        const itemValues = Object.values(item).map(value => {
          if (value !== null && value !== undefined) {
            return value.toString().toLowerCase();
          }
          return '';
        });
        return searchTerms.every(term => itemValues.some(value => value.includes(term)));
      });
    } else {
      this.filteredData = [...this.expenseTypes];
    }
  }

  openModal() {
    this.modalReference = this.modalService.open(this.addTypeModal, {});
  }

  submitForm(){
    this.loadingBtn = true;
    this.formProcessed = true;
    this.formSubmit = true;
    if (this.addTypeForm.invalid) {
      this.loadingBtn = false;
      this.formSubmit = false;
      return;
    }

    const formData = new FormData();
    formData.append(`expence_type`, this.addTypeForm.value['expName']);
    formData.append(`status`, 'Active');

    this.userService.addNewExpenseTypeSubmit(formData).subscribe(
      next => {
        if(next.status){
          this.appService.swalFire('Expense type created successfully!', 'success');
          this.formProcessed = false;
          this.formSubmit = false;
          this.addTypeForm.reset();
          this.modalReference.close();
          this.fetchList();
        }else{
          this.appService.swalFire(next.message, 'error');
        }
        this.loadingBtn = false;
      },
      error => {
        this.loadingBtn = false;
        this.appService.swalFire('Error Occurred while creating Expense type!', 'error');
      }
    );



  }

}
