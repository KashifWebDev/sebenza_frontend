import {Component, OnInit} from '@angular/core';
import {Calendar, EventApi, EventClickArg} from '@fullcalendar/core'; // include this line
import dayGridPlugin from '@fullcalendar/daygrid';
import {createEventId} from "./event-utils";
import {DateSelectArg} from "@fullcalendar/angular";
import { INITIAL_EVENTS } from './event-utils';


@Component({
  selector: 'app-view-user-calender',
  templateUrl: './view-user-calender.component.html',
  styleUrls: ['./view-user-calender.component.scss']
})
export class ViewUserCalenderComponent implements OnInit {

  currentEvents: EventApi[] = [];

  calendarOptions = {
    headerToolbar: {
      left: 'prev,today,next',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
  };

  constructor() {
    const name = Calendar.name; // add this line in your constructor
  }


  ngOnInit(): void {
  }


  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        backgroundColor: 'rgba(0,204,204,.25)',
        borderColor: '#00cccc'
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

}
