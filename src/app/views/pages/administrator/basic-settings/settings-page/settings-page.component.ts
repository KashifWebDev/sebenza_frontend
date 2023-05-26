import { Component, OnInit } from '@angular/core';
import {AdministratorService} from "../../administrator.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
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
  loadingBtn: boolean = false;

  settings: basicSettings;
  isEditMode: boolean = false;
  formSubmit: boolean = false;
  formProcessed: boolean = false;
  loading: boolean = false;

  constructor(private adminService: AdministratorService,
              private appService: AppService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loading = true;
    const user = this.adminService.getBasicSettings().subscribe(
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
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    });
    this.SEOSettingsForm = this.formBuilder.group({
      name: ['', Validators.required],
      desc: ['', Validators.required],
      keywords: ['', Validators.required]
    });

    this.SEOSettingsForm.controls['name'].disable();
  }

  populateForm(settings: basicSettings) {
    this.basicSettingsForm.patchValue({
      name: settings.site_name,
      email: settings.email,
      phone: settings.contact,
      address: settings.address,
    });
    this.SEOSettingsForm.patchValue({
      name: settings.site_name,
      desc: settings.meta_description,
      keywords: settings.meta_keyword
    });
  }

  submitForm(){
    this.loadingBtn = true;

    this.formProcessed = true;
    this.formSubmit = true;
    if (this.basicSettingsForm.invalid) {
      this.formSubmit = false;
      return;
    }

    const formData = new FormData();
    formData.append(`roleName`, this.basicSettingsForm.value['roleName']);
      this.adminService.addNewRoleSubmit(formData).subscribe(
        next => {
          if(next.status){
            this.appService.swalFire('Role created successfully!', 'success');
            this.basicSettingsForm.reset();
          }else{
            this.appService.swalFire(next.message, 'error');
          }
          this.loadingBtn = false;
        },
        error => {
          this.loadingBtn = false;
          this.appService.swalFire('Error Occurred while creating role!', 'error');
        }
      );
  }
}
