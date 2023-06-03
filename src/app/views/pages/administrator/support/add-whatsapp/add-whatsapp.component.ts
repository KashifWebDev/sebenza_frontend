import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {WhatsApp} from "../../../../../core/interfaces/interfaces";
import {AdministratorService} from "../../administrator.service";
import {AppService} from "../../../../../app.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add-whatsapp',
  templateUrl: './add-whatsapp.component.html',
  styleUrls: ['./add-whatsapp.component.scss']
})
export class AddWhatsappComponent implements OnInit {
  addWhatsAppForm: FormGroup;
  loadingBtn: boolean = false;

  editWhatsapp: WhatsApp;
  isEditMode: boolean = false;
  whatsappID: number;
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
      this.whatsappID = +params['edit'];
      this.isEditMode = !!this.whatsappID;
      this.initializeForm();
      if (this.isEditMode) {
        this.loading = true;
        const user = this.adminService.getWhatsappById(this.whatsappID).subscribe(
          (res) => {
            if(res.status && res.data?.whatsapp){
              this.editWhatsapp = res.data.whatsapp;
              this.loading = false;
              this.populateForm(this.editWhatsapp);
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
      user_name: ['', Validators.required],
      whatsapp_number: ['', Validators.required],
      status: ['']
    });
  }

  populateForm(wa: WhatsApp) {
    this.addWhatsAppForm.patchValue({
      user_name: wa.user_name,
      whatsapp_number: wa.whatsapp_number,
      status: wa.status,
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
    formData.append(`user_name`, this.addWhatsAppForm.value['user_name']);
    formData.append(`whatsapp_number`, this.addWhatsAppForm.value['whatsapp_number']);
    if(this.isEditMode){
      formData.append(`status`, this.addWhatsAppForm.value['status']);
      this.adminService.editWhatsappSubmit(formData, this.editWhatsapp.id).subscribe(
        next => {
          if(next.status){
            this.appService.swalFire('Whatsapp updated successfully!', 'success');
            this.formSubmit = false;
            this.addWhatsAppForm.reset();
            this.router.navigate(['/administrator/support/whatsapp']);
          }else{
            this.appService.swalFire(next.message, 'error');
          }
          this.loadingBtn = false;
        },
        error => {
          this.loadingBtn = false;
          this.appService.swalFire('Error Occurred while adding whatsapp!', 'error');
        }
      );
    }else{
      this.adminService.addNewWhatsappSubmit(formData).subscribe(
        next => {
          if(next.status){
            this.appService.swalFire('Whatsapp Contact Added successfully!', 'success');
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
          this.appService.swalFire('Error Occurred while adding whatsapp!', 'error');
        }
      );
    }



  }
}
