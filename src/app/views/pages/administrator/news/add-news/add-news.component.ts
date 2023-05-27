import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {News} from "../../../../../core/interfaces/interfaces";
import {AdministratorService} from "../../administrator.service";
import {AppService} from "../../../../../app.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ContentChange, SelectionChange} from "ngx-quill";

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss']
})
export class AddNewsComponent implements OnInit {
  quillConfig = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['code-block'],
        //  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        //  [{ 'direction': 'rtl' }],                         // text direction

        //  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'align': [] }],

        //  ['clean'],                                         // remove formatting button

        //  ['link'],
        ['link', 'image', 'video']
      ],
    },
  }
  onSelectionChanged = (event: SelectionChange) => {
    if(event.oldRange == null) {
      this.onFocus();
    }
    if(event.range == null) {
      this.onBlur();
    }
  }

  onContentChanged = (event: ContentChange) => {
    // console.log(event.html);
  }

  onFocus = () => {
    console.log("On Focus");
  }
  onBlur = () => {
    console.log("Blurred");
  }
  fileToUpload: File;








  addNewsForm: FormGroup;
  loadingBtn: boolean = false;

  editNews: News;
  isEditMode: boolean = false;
  newsID: number;
  formSubmit: boolean = false;
  formProcessed: boolean = false;
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
      description: ['<p>Announcement Body...</p>', Validators.required],
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
      this.loadingBtn = false;
      return;
    }

    const formData = new FormData();
    formData.append(`title`, this.addNewsForm.value['title']);
    formData.append(`description`, this.addNewsForm.value['description']);
    formData.append(`status`, this.addNewsForm.value['status']);
    formData.append(`postImage`, this.addNewsForm.value['uploadImg']);
    if(this.fileToUpload) formData.append('postImage', this.fileToUpload);
    if(this.isEditMode){
      this.adminService.editNewsSubmit(formData, this.editNews.id).subscribe(
        next => {
          if(next.status){
            this.appService.swalFire('News updated successfully!', 'success');
            this.formSubmit = false;
            this.addNewsForm.reset();
            this.router.navigate(['/administrator/news']);
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
      this.adminService.addNewsSubmit(formData).subscribe(
        next => {
          if(next.status){
            this.appService.swalFire('News created successfully!', 'success');
            this.addNewsForm.reset();
            this.router.navigate(['/administrator/news']);
          }else{
            this.appService.swalFire(next.message, 'error');
          }
          this.loadingBtn = false;
        },
        error => {
          this.loadingBtn = false;
          this.appService.swalFire('Error Occurred while creating News!', 'error');
        }
      );
    }
  }

  handleFileInput(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      this.addNewsForm.patchValue({ uploadImg: file });
    }
  }


}
