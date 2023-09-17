import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {vat, withdraw} from "../../../../../core/interfaces/interfaces";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../../user.service";
import {AppService} from "../../../../../app.service";
import { ColumnMode } from '@swimlane/ngx-datatable';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-vat',
  templateUrl: './vat.component.html',
  styleUrls: ['./vat.component.scss']
})
export class VatComponent implements OnInit {

  vatTax: vat;
  loading: boolean = true;

  ColumnMode = ColumnMode;
  deleteLoading: boolean = false;
  searchText = '';
  modalReference: NgbModalRef;
  @ViewChild('basicModal', { static: true }) editDetailsModal: TemplateRef<any> | NgbModalRef;

  btnLoading: boolean = false;
  editForm: FormGroup;
  formSubmit: boolean = false;
  formProcessed: boolean = false;
  loadingBtn: boolean = false;


  constructor(private userService: UserService,
              private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private appService: AppService) { }

  ngOnInit(): void {
    this.fetchList();
  }

  modifyDate(date: string){
    return date.split('T')[0];
  }

  setupForm(){
    this.editForm = this.formBuilder.group({
      vat: [this.vatTax.vat ? this.vatTax.vat : '', Validators.required],
      tax: [this.vatTax.tax ? this.vatTax.tax : '', Validators.required],
    });
  }

  fetchList(){
    this.userService.getVatList().subscribe(
      res => {
        if(res.status && res.data?.vattaxs){
          this.vatTax = res.data.vattaxs;
          this.setupForm();
        }
        this.loading = false;
      },
      error => {
        this.appService.swalFire('Error occurred while getting VAT taxes', 'error');
        this.loading = false;
      }
    );
  }

  editDetails() {
    this.modalReference = this.modalService.open(this.editDetailsModal, {});
  }

  get form() {
    return this.editForm.controls;
  }

  confirmModal(){
    this.btnLoading = true;
    const formData = new FormData();
    formData.append(`vat`, this.editForm.value['vat']);
    formData.append(`tax`, this.editForm.value['tax']);
      this.userService.updateVat(formData).subscribe(
        data => {
          if(data.status){
            this.appService.swalFire('Vat updated Successfully', 'success');
            this.fetchList();
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

}
