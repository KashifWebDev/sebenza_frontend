import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Ticket, User} from "../../../../../core/interfaces/interfaces";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {AdministratorService} from "../../administrator.service";
import {AppService} from "../../../../../app.service";
import {defaultIfEmpty, filter, map, Observable} from "rxjs";

@Component({
  selector: 'app-all-tickets',
  templateUrl: './all-tickets.component.html',
  styleUrls: ['./all-tickets.component.scss']
})
export class AllTicketsComponent implements OnInit, AfterViewInit {
  tickets: Ticket[] = [];
  filteredData: Ticket[] = [...this.tickets];
  defaultNavActiveId = 1;
  empty: boolean;
  loadingTickets: boolean = true;

  pendingTickets: Ticket[] = [];
  answeredTickets: Ticket[] = [];
  closedTickets: Ticket[] = [];

  filteredPendingTickets: Ticket[] = [];
  filteredAnsweredTickets: Ticket[] = [];
  filteredClosedTickets: Ticket[] = [];

  searchText: string = '';

  constructor(private adminService: AdministratorService) { }

  ngOnInit(): void {
    this.adminService.getAllTickets().subscribe(response => {
      if (response.status && response.data) {
        if(response.data.supporttickets.length){
          this.empty = false;
          this.tickets = response.data.supporttickets;
          this.filterData();
        }else{
          this.empty = true;
        }
        this.loadingTickets = false;

        this.pendingTickets = this.tickets.filter(ticket => ticket.status === 'Pending');
        this.answeredTickets = this.tickets.filter(ticket => ticket.status === 'Answered');
        this.closedTickets = this.tickets.filter(ticket => ticket.status === 'Closed');

        this.filteredPendingTickets = [...this.pendingTickets];
        this.filteredAnsweredTickets = [...this.answeredTickets];
        this.filteredClosedTickets = [...this.closedTickets];
      }
    });
  }

  ngAfterViewInit(): void {

    // Show chat-content when clicking on chat-item for tablet and mobile devices
    document.querySelectorAll('.chat-list .chat-item').forEach(item => {
      item.addEventListener('click', event => {
        document.querySelector('.chat-content')!.classList.toggle('show');
      })
    });

  }

  // back to chat-list for tablet and mobile devices
  backToChatList() {
    document.querySelector('.chat-content')!.classList.toggle('show');
  }

  save() {
    console.log('passs');

  }

  filterData() {
    const searchTerm = this.searchText.toLowerCase();
    this.filteredPendingTickets = this.pendingTickets.filter(item =>
      this.itemContainsSearchText(item, searchTerm)
    );
    this.filteredAnsweredTickets = this.answeredTickets.filter(item =>
      this.itemContainsSearchText(item, searchTerm)
    );
    this.filteredClosedTickets = this.closedTickets.filter(item =>
      this.itemContainsSearchText(item, searchTerm)
    );
  }

  itemContainsSearchText(item: any, searchTerm: string): boolean {
    for (const key in item) {
      if (typeof item[key] === 'string' && item[key].toLowerCase().includes(searchTerm)) {
        return true;
      }
    }
    return false;
  }

}
