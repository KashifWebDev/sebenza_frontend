import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {promoCode, WhatsApp} from "../../../../../../core/interfaces/interfaces";
import {AdministratorService} from "../../../administrator.service";
import {AppService} from "../../../../../../app.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add-promocode',
  templateUrl: './add-promocode.component.html',
  styleUrls: ['./add-promocode.component.scss']
})
export class AddPromocodeComponent implements OnInit {
  addWhatsAppForm: FormGroup;
  loadingBtn: boolean = false;

  editPromoCode: promoCode;
  isEditMode: boolean = false;
  promoCodeID: number;
  formSubmit: boolean = false;
  formProcessed: boolean = false;
  loading: boolean = false;

  constructor(private adminService: AdministratorService,
              private appService: AppService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.addWhatsAppForm = new FormGroup({
      roleName: new FormControl('', [Validators.required]),
    });

    this.route.queryParams.subscribe(params => {
      this.promoCodeID = +params['edit'];
      this.isEditMode = !!this.promoCodeID;
      this.initializeForm();
      if (this.isEditMode) {
        this.loading = true;
        const user = this.adminService.getPromoCodeById(this.promoCodeID).subscribe(
          (res) => {
            if(res.status && res.data?.promocodes){
              this.editPromoCode = res.data.promocodes;
              this.loading = false;
              this.populateForm(this.editPromoCode);
            }else{
              this.appService.swalFire(res.message, 'error');
            }
          },
          (error) => {
            this.appService.swalFire('An error was occurred while fetching user details!', 'error');
          }
        );
      }
    });
  }

  initializeForm() {
    // Initialize the form with empty fields
    this.addWhatsAppForm = this.formBuilder.group({
      title: ['', Validators.required],
      promocode: ['', Validators.required],
      expired_date: ['', Validators.required],
      discount_percent: ['', Validators.required],
      status: ['']
    });
  }

  populateForm(pc: promoCode) {
    this.addWhatsAppForm.patchValue({
      title: pc.title,
      promocode: pc.promocode,
      expired_date: pc.expired_date,
      discount_percent: pc.discount_percent,
      status: pc.status,
    });
  }

  get form() {
    return this.addWhatsAppForm.controls;
  }

  submitForm(){
    this.loadingBtn = true;
    this.formProcessed = true;
    this.formSubmit = true;
    if (this.addWhatsAppForm.invalid) {
      this.loadingBtn = false;
      this.formSubmit = false;
      return;
    }

    const formData = new FormData();
    formData.append(`title`, this.addWhatsAppForm.value['title']);
    formData.append(`promocode`, this.addWhatsAppForm.value['promocode']);
    formData.append(`expired_date`, this.addWhatsAppForm.value['expired_date']);
    formData.append(`discount_percent`, this.addWhatsAppForm.value['discount_percent']);
    if(this.isEditMode){
      formData.append(`status`, this.addWhatsAppForm.value['status']);
      this.adminService.editPromoCodeSubmit(formData, this.editPromoCode.id).subscribe(
        next => {
          if(next.status){
            this.appService.swalFire('Promo Code updated successfully!', 'success');
            this.formSubmit = false;
            this.addWhatsAppForm.reset();
            this.router.navigate(['/administrator/marketing/promocodes']);
          }else{
            this.appService.swalFire(next.message, 'error');
          }
          this.loadingBtn = false;
        },
        error => {
          this.loadingBtn = false;
          this.appService.swalFire('Error Occurred while adding Promo Code!', 'error');
        }
      );
    }else{
      this.adminService.submitPromoCode(formData).subscribe(
        next => {
          if(next.status){
            this.appService.swalFire('Promo Code Added successfully!', 'success');
            this.formProcessed = false;
            this.formSubmit = false;
            this.addWhatsAppForm.reset();
          }else{
            this.appService.swalFire(next.message, 'error');
          }
          this.loadingBtn = false;
        },
        error => {
          this.loadingBtn = false;
          this.appService.swalFire('Error Occurred while adding Promo Code!', 'error');
        }
      );
    }



  }
}
