import { Component, OnInit } from '@angular/core';
import {Meeting} from "../../../../../core/interfaces/interfaces";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../user.service";
import {AppService} from "../../../../../app.service";

@Component({
  selector: 'app-view-meeting',
  templateUrl: './view-meeting.component.html',
  styleUrls: ['./view-meeting.component.scss']
})
export class ViewMeetingComponent implements OnInit {

  meeting: Meeting;
  meetingID: number;
  loading: boolean = false;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private appService: AppService) { }

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.meetingID = params['id'];
      this.userService.getMeetingById(this.meetingID).subscribe(
        (res) => {
          if(res.status && res.data?.metings){
            this.meeting = res.data.metings;
            this.loading = false;
          }else{
            this.appService.swalFire(res.message, 'error');
          }
        },
        (error) => {
          this.appService.swalFire('An error was occurred while fetching meeting details!', 'error');
        }
      );
    });
  }

}
