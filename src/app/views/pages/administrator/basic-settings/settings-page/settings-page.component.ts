import { Component, OnInit } from '@angular/core';
import {AdministratorService} from "../../administrator.service";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../../../app.service";
import {ActivatedRoute, Router} from "@angular/router";
import {basicSettings, role} from "../../../../../core/interfaces/interfaces";

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {
  basicSettingsForm: FormGroup;
  SEOSettingsForm: FormGroup;
  socialForm: FormGroup;
  pixelForm: FormGroup;
  loadingBtn1: boolean = false;
  loadingBtn2: boolean = false;
  loadingBtn3: boolean = false;
  loadingBtn4: boolean = false;
  formSubmit: boolean = false;

  settings: basicSettings;
  isEditMode: boolean = false;
  formProcessed: boolean = false;
  loading: boolean = false;

  form3 = [
    {label: 'Facebook', fcn: 'facebook'},
    {label: 'Instagram', fcn: 'instagram'},
    {label: 'Tiktok', fcn: 'tiktok'},
    {label: 'Pinterest', fcn: 'pinterest'},
    {label: 'Twitter', fcn: 'twitter'},
    {label: 'Google', fcn: 'google'},
    {label: 'RSS', fcn: 'rss'},
    {label: 'LinkedIn', fcn: 'linkedin'},
    {label: 'YouTube', fcn: 'youtube'},
  ];

  constructor(private adminService: AdministratorService,
              private appService: AppService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loading = true;
    this.adminService.getBasicSettings().subscribe(
      (res) => {
        if(res.status && res.data?.basicinfo){
          this.settings = res.data.basicinfo;
          this.loading = false;
          this.populateForm(this.settings);
        }else{
          this.appService.swalFire(res.message, 'error');
        }
      },
      (error) => {
        this.appService.swalFire('An error was occurred while fetching user details!', 'error');
      }
    );
  }

  initializeForm() {
    this.basicSettingsForm = this.formBuilder.group({
      title: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    });
    this.SEOSettingsForm = this.formBuilder.group({
      name: ['', Validators.required],
      desc: ['', Validators.required],
      keywords: ['', Validators.required]
    });
    this.socialForm = this.formBuilder.group({
      facebook: [''],
      instagram: [''],
      tiktok: [''],
      pinterest: [''],
      twitter: [''],
      google: [''],
      rss: [''],
      linkedin: [''],
      youtube: [''],
    });
    this.pixelForm = this.formBuilder.group({
      fb: ['', Validators.required],
      google: ['', Validators.required]
    });

    this.SEOSettingsForm.controls['name'].disable();
  }

  populateForm(settings: basicSettings) {
    this.basicSettingsForm.patchValue({
      title: settings.title,
      email: settings.email,
      phone: settings.contact,
      address: settings.address,
    });
    this.SEOSettingsForm.patchValue({
      name: settings.title,
      desc: settings.meta_description,
      keywords: settings.meta_keyword
    });
    this.socialForm.patchValue({
      facebook: settings.facebook,
      instagram: settings.instagram,
      tiktok: settings.tiktok,
      pinterest: settings.pinterest,
      twitter: settings.twitter,
      google: settings.google,
      rss: settings.rss,
      linkedin: settings.linkedin,
      youtube: settings.youtube
    });
    this.pixelForm.patchValue({
      fb: settings.facebook_pixel,
      google: settings.google_analytics
    });

  }

  submitForm(id: number){
    this.formProcessed = true;
    const formData = new FormData();
    if(id==1){
      if (this.basicSettingsForm.invalid) {
        this.formSubmit = false;
        return;
      }
      this.loadingBtn1 = true;
      formData.append(`title`, this.basicSettingsForm.value['title']);
      formData.append(`email`, this.basicSettingsForm.value['email']);
      formData.append(`contact`, this.basicSettingsForm.value['phone']);
      formData.append(`address`, this.basicSettingsForm.value['address']);
      this.adminService.editSetting1Submit(formData).subscribe(
        next => {
          if(next.status){
            this.appService.swalFire('Basic Settings updated Successfully!!', 'success');
          }else{
            this.appService.swalFire(next.message, 'error');
          }
          this.loadingBtn1 = false;
        },
        error => {
          this.loadingBtn1 = false;
          this.appService.swalFire('Error Occurred while updating settings!', 'error');
        }
      );
    }
    if(id==2){
      if (this.SEOSettingsForm.invalid) {
        this.formSubmit = false;
        return;
      }
      this.loadingBtn2 = true;
      formData.append(`site_name`, this.SEOSettingsForm.value['name']);
      formData.append(`meta_description`, this.SEOSettingsForm.value['desc']);
      formData.append(`meta_keyword`, this.SEOSettingsForm.value['keywords']);
      this.adminService.editSetting2Submit(formData).subscribe(
        next => {
          if(next.status){
            this.appService.swalFire('Meta Settings updated Successfully!!', 'success');
          }else{
            this.appService.swalFire(next.message, 'error');
          }
          this.loadingBtn2 = false;
        },
        error => {
          this.loadingBtn2 = false;
          this.appService.swalFire('Error Occurred while updating settings!', 'error');
        }
      );
    }
    if(id==3){
      if (this.socialForm.invalid) {
        this.formSubmit = false;
        return;
      }
      this.loadingBtn3 = true;
      this.form3.forEach(item => {
        formData.append(item.fcn, this.socialForm.value[item.fcn]);
      })
      this.adminService.editSetting3Submit(formData).subscribe(
        next => {
          if(next.status){
            this.appService.swalFire('Social Links updated Successfully!!', 'success');
          }else{
            this.appService.swalFire(next.message, 'error');
          }
          this.loadingBtn3 = false;
        },
        error => {
          this.loadingBtn3 = false;
          this.appService.swalFire('Error Occurred while updating settings!', 'error');
        }
      );
    }
    if(id==4){
      if (this.pixelForm.invalid) {
        this.formSubmit = false;
        return;
      }
      this.loadingBtn2 = true;
      formData.append(`facebook_pixel`, this.pixelForm.value['fb']);
      formData.append(`google_analytics`, this.pixelForm.value['google']);
      this.adminService.editSetting4Submit(formData).subscribe(
        next => {
          if(next.status){
            this.appService.swalFire('Pixel Analytics Settings updated Successfully!!', 'success');
          }else{
            this.appService.swalFire(next.message, 'error');
          }
          this.loadingBtn2 = false;
        },
        error => {
          this.loadingBtn2 = false;
          this.appService.swalFire('Error Occurred while updating settings!', 'error');
        }
      );
    }
  }



  form(form: FormGroup) {
    return form.controls;
  }
  form3Get(control: AbstractControl | any) {
    return control.errors;
  }

}
