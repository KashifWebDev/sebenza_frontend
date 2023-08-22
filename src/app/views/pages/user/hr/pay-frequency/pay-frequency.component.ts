import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {accountType, order, payFrequency} from "../../../../../core/interfaces/interfaces";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../user.service";
import {AppService} from "../../../../../app.service";

@Component({
  selector: 'app-pay-frequency',
  templateUrl: './pay-frequency.component.html',
  styleUrls: ['./pay-frequency.component.scss']
})
export class PayFrequencyComponent implements OnInit {

  paymentFrequencies: payFrequency[];
  loading: boolean = true;
  modalReference: NgbModalRef;
  @ViewChild('basicModal', { static: true }) deleteModal: TemplateRef<any> | NgbModalRef;
  @ViewChild('delModal', { static: true }) delModal: TemplateRef<any> | NgbModalRef;
  btnLoading: boolean = false;
  addNewPaymentFreqForm: FormGroup;
  formSubmit: boolean = false;
  formProcessed: boolean = false;
  loadingBtn: boolean = false;
  delPayFrequencyID: number;

  constructor(private userService: UserService, private modalService: NgbModal,
              private formBuilder: FormBuilder, private appService: AppService) { }

  ngOnInit(): void {
    this.addNewPaymentFreqForm = this.formBuilder.group({
      freqName: ['', Validators.required]
    });

    this.getPageData();
  }

  getPageData(){
    this.loading = true;
    this.userService.getAllPaymentFrequency().subscribe(response => {
      if (response.status && response.data?.paymentfrequencys) {
        this.paymentFrequencies = response.data.paymentfrequencys;
        this.loading = false;
      }
    });
  }

  get form() {
    return this.addNewPaymentFreqForm.controls;
  }

  modifyDate(date: string){
    return date.split('T')[0];
  }

  openModal(){
    this.modalReference = this.modalService.open(this.deleteModal, {});
  }

  openDelModal(id: number){
    this.delPayFrequencyID = id;
    this.modalReference = this.modalService.open(this.delModal, {});
  }

  confirmSaveModal(){
    this.btnLoading = true;

    let formData: FormData = new FormData();
    formData.append('frequecy_name', this.addNewPaymentFreqForm.controls['freqName'].value);

    this.userService.addNewFrequency(formData).subscribe(
      data => {
        if(data.status){
          this.addNewPaymentFreqForm.reset();
          this.appService.swalFire('Pay frequency added Successfully', 'success');
          this.getPageData();
          this.modalReference.close();
        }else{
          this.appService.swalFire(data.message, 'error');
        }
        this.btnLoading = false;
      },
      (error) => {
        this.btnLoading = false;
        this.appService.swalFire('An error occurred while performing action', 'error');
      }
    );
  }

  confirmModal(){
    this.btnLoading = true;
    this.userService.deletePayFrequency(this.delPayFrequencyID).subscribe(
      data => {
        if(data.status){
          this.appService.swalFire('Pay frequency deleted Successfully', 'success');
          this.getPageData();
          this.modalReference.close();
        }else{
          this.appService.swalFire(data.message, 'error');
        }
        this.btnLoading = false;
      },
      (error) => {
        this.btnLoading = false;
        this.appService.swalFire('An error occurred while performing action', 'error');
      }
    );
  }

}
