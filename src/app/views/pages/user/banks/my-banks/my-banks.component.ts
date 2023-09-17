import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {accountType, bank, WhatsApp} from "../../../../../core/interfaces/interfaces";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {AdministratorService} from "../../../administrator/administrator.service";
import {AppService} from "../../../../../app.service";
import { ColumnMode } from '@swimlane/ngx-datatable';
import {UserService} from "../../user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-my-banks',
  templateUrl: './my-banks.component.html',
  styleUrls: ['./my-banks.component.scss']
})
export class MyBanksComponent implements OnInit {
  @ViewChild('dataTable') dataTable!: ElementRef;
  basicModalCloseResult: string = '';
  banks: bank[] = [];

  @ViewChild('basicModal', { static: true }) deleteModal: TemplateRef<any> | NgbModalRef;
  ColumnMode = ColumnMode;
  deleteLoading: boolean = false;
  modalReference: NgbModalRef;
  filteredData: bank[] = [...this.banks];
  searchText = '';
  editBankDetails: bank;
  loading: boolean = true;


  btnLoading: boolean = false;
  editForm: FormGroup;
  formSubmit: boolean = false;
  formProcessed: boolean = false;
  loadingBtn: boolean = false;

  constructor(private userService: UserService, private modalService: NgbModal,
              private appService: AppService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getBanks();
    this.initializeForm();
  }


  initializeForm() {
    this.editForm = this.formBuilder.group({
      payment_method: ['', Validators.required],
      account_name: ['', Validators.required],
      account_number: [''],
      additional_info: [''],
      status: ['']
    });
  }

  populateForm(bank: bank) {
    this.editForm.patchValue({
      payment_method: bank.payment_method,
      account_name: bank.account_name,
      account_number: bank.account_number,
      additional_info: bank.additional_info,
      status: bank.status,
    });
  }

  getBanks(){
    this.loading = true;
    this.userService.getCurrentUserBanks().subscribe(response => {
      if (response.status && response.data?.banks) {
        this.banks = response.data.banks;
        this.filterData();
        this.loading = false;
      }
    });
  }

  confirmModal(){
    this.btnLoading = true;
    const formData = new FormData();
    formData.append(`payment_method`, this.editForm.value['payment_method']);
    formData.append(`account_name`, this.editForm.value['account_name']);
    formData.append(`account_number`, this.editForm.value['account_number']);
    formData.append(`additional_info`, this.editForm.value['additional_info']);
    formData.append(`status`, 'Active');
    this.userService.updateBank(formData, this.editBankDetails.id).subscribe(
      data => {
        if(data.status){
          this.appService.swalFire('Vat updated Successfully', 'success');
          this.getBanks();
          this.modalReference.close();
        }else{
          this.appService.swalFire(data.message, 'error');
        }
        this.btnLoading = false;
      },
      (error) => {
        this.btnLoading = false;
        this.appService.swalFire('An error occurred while creating Order', 'error');
      }
    );
  }

  get form() {
    return this.editForm.controls;
  }

  filterData() {
    if (this.searchText.trim() !== '') {
      const searchTerms = this.searchText.toLowerCase().split(' ');

      this.filteredData = this.banks.filter(item => {
        const itemValues = Object.values(item).map(value => {
          if (value !== null && value !== undefined) {
            return value.toString().toLowerCase();
          }
          return '';
        });
        return searchTerms.every(term => itemValues.some(value => value.includes(term)));
      });
    } else {
      this.filteredData = [...this.banks];
    }
  }

  editBank(bank: bank) {
    this.editBankDetails = bank;
    this.populateForm(bank);
    this.modalReference = this.modalService.open(this.deleteModal, {});
  }
}
