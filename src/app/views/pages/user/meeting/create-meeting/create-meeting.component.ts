import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../user.service";
import {AppService} from "../../../../../app.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-create-meeting',
  templateUrl: './create-meeting.component.html',
  styleUrls: ['./create-meeting.component.scss']
})
export class CreateMeetingComponent implements OnInit {

  addMeetingForm: FormGroup;
  loadingBtn: boolean = false;

  isEditMode: boolean = false;
  formSubmit: boolean = false;
  formProcessed: boolean = false;
  loading: boolean = false;
  platforms: string[] = ['Zoom', 'Google Meet', 'Skype', 'Teams'];
  time = {hour: 13, minute: 30};

  constructor(private userService: UserService,
              private appService: AppService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.addMeetingForm = this.formBuilder.group({
      title: ['', Validators.required],
      platform: ['', Validators.required],
      description: ['', Validators.required],
      link: ['', Validators.required],
      date: [this.time, Validators.required],
      time: [this.time, Validators.required]
    });
  }

  get form() {
    return this.addMeetingForm.controls;
  }

  submitForm(){
    this.loadingBtn = true;

    this.formProcessed = true;
    this.formSubmit = true;
    if (this.addMeetingForm.invalid) {
      this.formSubmit = false;
      this.loadingBtn = false;
      return;
    }

    const formData = new FormData();
    let time = this.addMeetingForm.value['time'].hour+':'+this.addMeetingForm.value['time'].minute+':'+this.addMeetingForm.value['time'].second;
    let date = this.addMeetingForm.value['date'].year+'-'+this.addMeetingForm.value['date'].month+'-'+this.addMeetingForm.value['date'].day;
    formData.append(`title`, this.addMeetingForm.value['title']);
    formData.append(`link`, this.addMeetingForm.value['link']);
    formData.append(`place`, this.addMeetingForm.value['platform']);
    formData.append(`description`, this.addMeetingForm.value['description']);
    formData.append(`date`, date);
    formData.append(`time`, time);
    this.userService.submitAddMeeting(formData).subscribe(
      next => {
        if(next.status){
          this.appService.swalFire('Meeting Added Successfully!', 'success');
          this.addMeetingForm.reset();
          this.router.navigate(['/user/meeting']);
        }else{
          this.appService.swalFire(next.message, 'error');
        }
        this.loadingBtn = false;
      },
      error => {
        this.loadingBtn = false;
        this.appService.swalFire('Error Occurred while adding meeting!', 'error');
      }
    );
  }

}
