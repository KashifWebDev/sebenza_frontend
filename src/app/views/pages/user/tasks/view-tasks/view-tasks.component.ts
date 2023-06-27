import { Component, OnInit } from '@angular/core';
import {Task} from "../../../../../core/interfaces/interfaces";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../user.service";
import {AppService} from "../../../../../app.service";

@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.scss']
})
export class ViewTasksComponent implements OnInit {

  task: Task;
  taskID: number;
  loading: boolean = false;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private appService: AppService) { }

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.taskID = params['id'];
      this.userService.getTaskById(this.taskID).subscribe(
        (res) => {
          if(res.status && res.data?.tasks){
            this.task = res.data.tasks;
            this.loading = false;
          }else{
            this.appService.swalFire(res.message, 'error');
          }
        },
        (error) => {
          this.appService.swalFire('An error was occurred while fetching task details!', 'error');
        }
      );
    });
  }

}
