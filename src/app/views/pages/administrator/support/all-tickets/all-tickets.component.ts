import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
  loadingTickets: boolean = false;

  pendingTickets: Ticket[] = [];
  answeredTickets: Ticket[] = [];
  closedTickets: Ticket[] = [];

  filteredPendingTickets: Ticket[] = [];
  filteredAnsweredTickets: Ticket[] = [];
  filteredClosedTickets: Ticket[] = [];

  searchText: string = '';
  singleTicket: Ticket | undefined;
  ticketReplies: ticketReplies[];
  loadingReply: boolean = false;
  sendReplyForm: FormGroup;
  fileToUpload: File;
  @ViewChild('fileInputRef') fileInputRef!: ElementRef;

  constructor(private adminService: AdministratorService, private appService: AppService, private authService: AuthService) { }

  ngOnInit(): void {
    this.sendReplyForm = new FormGroup({
      message: new FormControl('', [Validators.required]),
    });

    this.getAllTickets();
  }

  getAllTickets(){
    this.loadingTickets = true;

    this.filteredPendingTickets = [];
    this.filteredAnsweredTickets = [];
    this.filteredClosedTickets = [];
    this.pendingTickets = [];
    this.answeredTickets = [];
    this.closedTickets = [];

    this.adminService.getAllTickets().subscribe(response => {
      if (response.status && response.data) {
        if(response.data.supporttickets.length){
          this.tickets = response.data.supporttickets;
          this.filterData();

          this.pendingTickets = this.tickets.filter(ticket => ticket.status === 'Pending');
          this.answeredTickets = this.tickets.filter(ticket => ticket.status === 'Answered');
          this.closedTickets = this.tickets.filter(ticket => ticket.status === 'Closed');
          this.filteredPendingTickets = [...this.pendingTickets];
          this.filteredAnsweredTickets = [...this.answeredTickets];
          this.filteredClosedTickets = [...this.closedTickets];

          this.loadingTickets = false;
        }
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
    if(this.fileToUpload) formData.append('replayatt', this.fileToUpload);
    this.adminService.adminSubmitTicketMessage(formData, (this.singleTicket && this.singleTicket.id) ? this.singleTicket.id : 0).subscribe(
      res => {
        if(res.status && res.data?.supporttickets){
          let ticketReply: ticketReplies = {
            from_user_id: 0,
            replayatt: "",
            users: this.authService.getLoggedInUser(),
            ticket_id: (this.singleTicket && this.singleTicket.id) ? this.singleTicket.id : 0,
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

  closeTicket(id: number){
    this.singleTicket = undefined;
    let formData = new FormData();
    formData.append(`status`, 'Closed');
    this.adminService.adminCloseTicket(formData, id).subscribe(
      res => {
        this.getAllTickets();
      },
      error => {

      }
    );
  }

  handleFileInput(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.fileToUpload = fileInput.files[0];
    }
  }


}
