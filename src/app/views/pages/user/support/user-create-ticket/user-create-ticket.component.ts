import { Component, OnInit } from '@angular/core';
import {UserService} from "../../user.service";
import {AppService} from "../../../../../app.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-create-ticket',
  templateUrl: './user-create-ticket.component.html',
  styleUrls: ['./user-create-ticket.component.scss']
})
export class UserCreateTicketComponent implements OnInit {

  fileToUpload: File;

  addTicketForm: FormGroup;
  loadingBtn: boolean = false;

  isEditMode: boolean = false;
  formSubmit: boolean = false;
  formProcessed: boolean = false;
  loading: boolean = false;
  departments: string[] = ['Accounts', 'Support Team', 'Sales Team'];
  priorities: string[] = ['High', 'Medium', 'Low'];

  constructor(private userService: UserService,
              private appService: AppService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.addTicketForm = this.formBuilder.group({
      subject: ['', Validators.required],
      department: ['', Validators.required],
      priority: ['', Validators.required],
      message: ['', Validators.required],
      uploadImg: ['']
    });
  }

  get form() {
    return this.addTicketForm.controls;
  }

  submitForm(){
    this.loadingBtn = true;

    this.formProcessed = true;
    this.formSubmit = true;
    if (this.addTicketForm.invalid) {
      this.formSubmit = false;
      this.loadingBtn = false;
      return;
    }

    const formData = new FormData();
    formData.append(`subject`, this.addTicketForm.value['subject']);
    formData.append(`department`, this.addTicketForm.value['department']);
    formData.append(`priority`, this.addTicketForm.value['priority']);
    formData.append(`message`, this.addTicketForm.value['message']);
    if(this.fileToUpload) formData.append('attachment', this.fileToUpload);
    this.userService.submitTicket(formData).subscribe(
      next => {
        if(next.status){
          this.appService.swalFire('Ticket Generated Successfully!', 'success');
          this.addTicketForm.reset();
          this.router.navigate(['/user/support']);
        }else{
          this.appService.swalFire(next.message, 'error');
        }
        this.loadingBtn = false;
      },
      error => {
        this.loadingBtn = false;
        this.appService.swalFire('Error Occurred while creating ticket!', 'error');
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
