import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Ticket, ticketReplies} from "../../../../../core/interfaces/interfaces";
import {AdministratorService} from "../../administrator.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../../../app.service";
import {AuthService} from "../../../auth/auth.service";
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
  singleTicket: Ticket;
  ticketReplies: ticketReplies[];
  loadingReply: boolean = false;
  sendReplyForm: FormGroup;

  constructor(private adminService: AdministratorService, private appService: AppService, private authService: AuthService) { }

  ngOnInit(): void {
    this.sendReplyForm = new FormGroup({
      message: new FormControl('', [Validators.required]),
    });

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

  getTicketDetails(id: number){
    this.loadingReply = true;
    this.adminService.getTicketsById(id).subscribe( res => {
      if(res.status){
        if(res.data?.supporttickets) this.singleTicket = res.data.supporttickets;
        if(res.data?.replays) this.ticketReplies = res.data.replays;
      }
      this.loadingReply = false;
    })
  }

  submitReply(){
    if(!this.sendReplyForm.valid){
      this.appService.swalFire('Message filed cannot be empty', 'error')
      return;
    }
    let formData = new FormData();
    formData.append(`type`, 'Admin');
    formData.append(`replay`, this.sendReplyForm.value['message']);
    this.adminService.adminSubmitTicketMessage(formData, this.singleTicket.id).subscribe(
      res => {
        if(res.status && res.data?.supporttickets){
          let ticketReply: ticketReplies = {
            from_user_id: 0,
            replayatt: "",
            users: this.authService.getLoggedInUser(),
            ticket_id: this.singleTicket.id,
            replay: this.sendReplyForm.value['message'],
            id: res.data.supporttickets.id,
            updated_at: res.data.supporttickets.created_at,
            type: 'Admin',
            status: 'Answered',
            created_at: res.data.supporttickets.created_at
          };
          this.ticketReplies.push(ticketReply);
        }else{
          this.appService.swalFire('An error occurred while sending message!', 'error');
        }
      },
    error => {
      this.appService.swalFire('An error occurred while sending message!', 'error');
    }
    );
  }

}
