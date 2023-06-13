import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Ticket, ticketReplies, User} from "../../../../../core/interfaces/interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AdministratorService} from "../../../administrator/administrator.service";
import {AppService} from "../../../../../app.service";
import {AuthService} from "../../../auth/auth.service";
import {UserService} from "../../user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-view-ticket',
  templateUrl: './user-view-ticket.component.html',
  styleUrls: ['./user-view-ticket.component.scss']
})
export class UserViewTicketComponent implements OnInit, AfterViewInit{
  tickets: Ticket[] = [];
  searchText: string = '';
  singleTicket: Ticket | undefined;
  ticketReplies: ticketReplies[];
  loadingReply: boolean = false;
  sendReplyForm: FormGroup;
  fileToUpload: File;
  @ViewChild('fileInputRef') fileInputRef!: ElementRef;
  ticketID: number;
  adminUser: User;

  constructor(private userService: UserService, private appService: AppService, private authService: AuthService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.ticketID = this.route.snapshot.params.id;
    this.getTicketDetails();

    this.sendReplyForm = new FormGroup({
      message: new FormControl('', [Validators.required]),
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

  getTicketDetails(){
    this.loadingReply = true;
    this.userService.getTicketsById(this.ticketID).subscribe( res => {
      if(res.status){
        if(res.data?.supporttickets) this.singleTicket = res.data.supporttickets;
        if(res.data?.replays) this.ticketReplies = res.data.replays;
        if(res.data?.replied_from) this.adminUser = res.data.replied_from;
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
    formData.append(`type`, 'User');
    formData.append(`replay`, this.sendReplyForm.value['message']);
    if(this.fileToUpload) formData.append('replayatt', this.fileToUpload);
    this.userService.submitTicketMessage(formData, this.ticketID).subscribe(
      res => {
        if(res.status && res.data?.supporttickets){
          let ticketReply: ticketReplies = {
            from_user_id: this.sendReplyForm.value['from_user_id'],
            replayatt: res.data.replay.replayatt,
            users: this.authService.getLoggedInUser(),
            ticket_id: (this.singleTicket && this.singleTicket.id) ? this.singleTicket.id : 0,
            replay: this.sendReplyForm.value['message'],
            id: res.data.replay.id,
            updated_at: res.data.replay.updated_at,
            type: 'User',
            status: 'Customer-Replay',
            created_at: res.data.replay.created_at
          };
          this.ticketReplies.push(ticketReply);
          this.sendReplyForm.reset();
        }else{
          this.appService.swalFire('An error occurred while sending message!', 'error');
        }
      },
      error => {
        this.appService.swalFire('An error occurred while sending message!', 'error');
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
