import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {role} from "../../../../../core/interfaces/interfaces";
import {UserService} from "../../user.service";
import {AppService} from "../../../../../app.service";

@Component({
  selector: 'app-bulk-user-upload',
  templateUrl: './bulk-user-upload.component.html',
  styleUrls: ['./bulk-user-upload.component.scss']
})
export class BulkUserUploadComponent implements OnInit {
  inviteForm: FormGroup;
  loadingBtn: boolean = false;

  formSubmit: boolean = false;
  formProcessed: boolean = false;
  formData: FormData = new FormData();
  fileToUpload: File;

  constructor(private userService: UserService,
              private appService: AppService) { }

  ngOnInit(): void {
    this.inviteForm = new FormGroup({
      file: new FormControl('', [Validators.required])
    });
  }


  get form() {
    return this.inviteForm.controls;
  }

  submitForm(){
    this.loadingBtn = true;
    this.formProcessed = true;
    this.formSubmit = true;
    if (this.inviteForm.invalid) {
      this.loadingBtn = false;
      this.formSubmit = false;
      return;
    }

    const formData = new FormData();
    formData.append(`file`, this.inviteForm.value['file']);

    this.userService.bulkImport(formData).subscribe(
      next => {
        if(next.status){
          this.appService.swalFire('Users were imported successfully!', 'success');
          this.formProcessed = false;
          this.formSubmit = false;
          this.inviteForm.reset();
        }else{
          this.appService.swalFire(next.message, 'error');
        }
        this.loadingBtn = false;
      },
      error => {
        this.loadingBtn = false;
        this.appService.swalFire('Error Occurred while importing users!!', 'error');
      }
    );
  }

  handleFileInput(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.fileToUpload = fileInput.files[0];
    }
  }

}
