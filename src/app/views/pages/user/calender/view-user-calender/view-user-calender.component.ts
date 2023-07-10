import {Component, OnInit} from '@angular/core';
import {Calendar} from '@fullcalendar/core'; // include this line
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridWeek from '@fullcalendar/timegrid';
import timeGridDay from '@fullcalendar/timegrid';
import listWeek from '@fullcalendar/list';
import {CalendarOptions} from "@fullcalendar/angular";
import {UserService} from "../../user.service";

@Component({
  selector: 'app-view-user-calender',
  templateUrl: './view-user-calender.component.html',
  styleUrls: ['./view-user-calender.component.scss']
})
export class ViewUserCalenderComponent implements OnInit {

  events: any = [
  ];
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,today,next',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridWeek,timeGridDay,listWeek],
    events: [],
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    eventClick: this.handleDateClick.bind(this),
  };

  constructor(private userService: UserService) {
    const name = Calendar.name; // add this line in your constructor
  }

  ngOnInit() {
    this.userService.getCalenders().subscribe(
      (response) => {
        if (response.status && response.data?.calenders) {
          this.calendarOptions.events = response.data.calenders.map(event => ({
            id: event.id.toString(),
            title: event.title,
            color: event.bgColor,
            start: `${event.startDate}T${event.startTime}`,
            end: `${event.endDate}T${event.endTime}`
          }));
        }
      }
    );
  }

  handleDateClick(arg: any) {
    alert('date click! ');
    console.log(arg.event.id);
  }
}
