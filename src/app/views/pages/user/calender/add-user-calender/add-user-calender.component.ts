import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../user.service";
import {AppService} from "../../../../../app.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add-user-calender',
  templateUrl: './add-user-calender.component.html',
  styleUrls: ['./add-user-calender.component.scss']
})
export class AddUserCalenderComponent implements OnInit {

  addEventForm: FormGroup;
  loadingBtn: boolean = false;
  formSubmit: boolean = false;
  formProcessed: boolean = false;
  loading: boolean = false;
  time = {hour: (new Date()).getHours(), minute: (new Date()).getMinutes()};
  date = {
    year: (new Date()).getFullYear(),
    month: (new Date()).getMonth()+1,
    day: (new Date()).getDate()
  };
  color = '#0d4430'

  constructor(private userService: UserService,
              private appService: AppService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.addEventForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      startDate: [this.date, Validators.required],
      startTime: [this.time, Validators.required],
      endDate: [this.date, Validators.required],
      endTime: [this.time, Validators.required]
    });
  }

  get form() {
    return this.addEventForm.controls;
  }

  submitForm(){
    console.log('ok');
    this.loadingBtn = true;

    this.formProcessed = true;
    this.formSubmit = true;
    if (this.addEventForm.invalid) {
      this.formSubmit = false;
      this.loadingBtn = false;
      this.appService.swalFire('Fill All Fields', 'error');
      console.log(this.addEventForm.value);
      return;
    }

    const formData = new FormData();
    let startTime = this.addEventForm.value['startTime'].hour+':'+this.addEventForm.value['startTime'].minute+':00';
    let startDate = this.addEventForm.value['startDate'].year+'-'+this.addEventForm.value['startDate'].month+'-'+this.addEventForm.value['startDate'].day;
    let endTime = this.addEventForm.value['endTime'].hour+':'+this.addEventForm.value['endTime'].minute+':00';
    let endDate = this.addEventForm.value['endDate'].year+'-'+this.addEventForm.value['endDate'].month+'-'+this.addEventForm.value['endDate'].day;
    formData.append(`title`, this.addEventForm.value['title']);
    formData.append(`details`, this.addEventForm.value['description']);
    formData.append(`startDate`, startDate);
    formData.append(`startTime`, startTime);
    formData.append(`endDate`, endDate);
    formData.append(`endTime`, endTime);
    formData.append(`bgColor`, this.color);
    this.userService.submitAddCalender(formData).subscribe(
      next => {
        if(next.status){
          this.appService.swalFire('Calendar Added Successfully!', 'success');
          this.addEventForm.reset();
          this.router.navigate(['/user/calendar']);
        }else{
          this.appService.swalFire(next.message, 'error');
        }
        this.loadingBtn = false;
      },
      error => {
        this.loadingBtn = false;
        this.appService.swalFire('Error Occurred while adding Calendar!', 'error');
      }
    );
  }

}
