import { Component, OnInit } from '@angular/core';
import dayGridPlugin from "@fullcalendar/daygrid";
import {Calendar} from "@fullcalendar/core";

@Component({
  selector: 'app-view-calender',
  templateUrl: './view-calender.component.html',
  styleUrls: ['./view-calender.component.scss']
})
export class ViewCalenderComponent implements OnInit {


  calendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth'
  };

  constructor() {
    const name = Calendar.name; // add this line in your constructor
  }

  ngOnInit(): void {
  }

}
