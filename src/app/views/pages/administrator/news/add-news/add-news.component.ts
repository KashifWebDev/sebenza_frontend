import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {accountType, News} from "../../../../../core/interfaces/interfaces";
import {AdministratorService} from "../../administrator.service";
import {AppService} from "../../../../../app.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss']
})
export class AddNewsComponent implements OnInit {
  addNewsForm: FormGroup;
  loadingBtn: boolean = false;

  editNews: News;
  isEditMode: boolean = false;
  newsID: number;
  formSubmit: boolean = false;
  formProcessed: boolean = false;
  formData: FormData = new FormData();
  loading: boolean = false;

  constructor(private adminService: AdministratorService,
              private appService: AppService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.addNewsForm = new FormGroup({
      roleName: new FormControl('', [Validators.required]),
    });

    this.route.queryParams.subscribe(params => {
      this.newsID = +params['edit'];
      this.isEditMode = !!this.newsID;
      this.initializeForm();
      if (this.isEditMode) {
        this.loading = true;
        const user = this.adminService.getNewsByID(this.newsID).subscribe(
          (res) => {
            if(res.status && res.data?.news){
              this.editNews = res.data.news;
              this.loading = false;
              this.populateForm(this.editNews);
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
    this.addNewsForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      uploadImg: ['']
    });
  }

  populateForm(news: News) {
    this.addNewsForm.patchValue({
      title: news.title,
      description: news.description,
      status: news.status
    });
  }

  get form() {
    return this.addNewsForm.controls;
  }

  submitForm(){
    this.loadingBtn = true;

    this.formProcessed = true;
    this.formSubmit = true;
    if (this.addNewsForm.invalid) {
      this.formSubmit = false;
      return;
    }

    const formData = new FormData();
    formData.append(`title`, this.addNewsForm.value['title']);
    formData.append(`description`, this.addNewsForm.value['description']);
    formData.append(`status`, this.addNewsForm.value['status']);
    formData.append(`uploadImg`, this.addNewsForm.value['uploadImg']);
    if(this.isEditMode){
      this.adminService.editAccTypeSubmit(formData, this.editNews.id).subscribe(
        next => {
          if(next.status){
            this.appService.swalFire('Account Type updated successfully!', 'success');
            this.formSubmit = false;
            this.addNewsForm.reset();
            this.router.navigate(['/administrator/account-types']);
          }else{
            this.appService.swalFire(next.message, 'error');
          }
          this.loadingBtn = false;
        },
        error => {
          this.loadingBtn = false;
          this.appService.swalFire('Error Occurred while updating Account Type!', 'error');
        }
      );
    }else{
      this.adminService.addNewAccTypeSubmit(formData).subscribe(
        next => {
          if(next.status){
            this.appService.swalFire('Account Type created successfully!', 'success');
            this.addNewsForm.reset();
          }else{
            this.appService.swalFire(next.message, 'error');
          }
          this.loadingBtn = false;
        },
        error => {
          this.loadingBtn = false;
          this.appService.swalFire('Error Occurred while creating account type!', 'error');
        }
      );
    }



  }
}
