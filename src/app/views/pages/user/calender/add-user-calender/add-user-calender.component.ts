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

  addTaskForm: FormGroup;
  loadingBtn: boolean = false;
  formSubmit: boolean = false;
  formProcessed: boolean = false;
  loading: boolean = false;
  time = {hour: 13, minute: 30};
  color = '#0d4430'

  constructor(private userService: UserService,
              private appService: AppService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.addTaskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      startDate: [this.time, Validators.required],
      startTime: [this.time, Validators.required],
      endDate: [this.time, Validators.required],
      endTime: [this.time, Validators.required],
      bgColor: [this.time, Validators.required]
    });
  }

  get form() {
    return this.addTaskForm.controls;
  }

  submitForm(){
    this.loadingBtn = true;

    this.formProcessed = true;
    this.formSubmit = true;
    if (this.addTaskForm.invalid) {
      this.formSubmit = false;
      this.loadingBtn = false;
      return;
    }

    const formData = new FormData();
    let time = this.addTaskForm.value['time'].hour+':'+this.addTaskForm.value['time'].minute+':'+this.addTaskForm.value['time'].second;
    let date = this.addTaskForm.value['date'].year+'-'+this.addTaskForm.value['date'].month+'-'+this.addTaskForm.value['date'].day;
    formData.append(`name`, this.addTaskForm.value['title']);
    formData.append(`details`, this.addTaskForm.value['description']);
    formData.append(`date`, date);
    formData.append(`time`, time);
    this.userService.submitAddTask(formData).subscribe(
      next => {
        if(next.status){
          this.appService.swalFire('Task Added Successfully!', 'success');
          this.addTaskForm.reset();
          this.router.navigate(['/user/tasks']);
        }else{
          this.appService.swalFire(next.message, 'error');
        }
        this.loadingBtn = false;
      },
      error => {
        this.loadingBtn = false;
        this.appService.swalFire('Error Occurred while adding Task!', 'error');
      }
    );
  }

}
