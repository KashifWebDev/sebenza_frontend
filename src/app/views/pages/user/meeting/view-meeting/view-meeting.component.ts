import { Component, OnInit } from '@angular/core';
import {Meeting, News} from "../../../../../core/interfaces/interfaces";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../user.service";
import {AppService} from "../../../../../app.service";
import {ContentChange, SelectionChange} from "ngx-quill";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-view-meeting',
  templateUrl: './view-meeting.component.html',
  styleUrls: ['./view-meeting.component.scss']
})
export class ViewMeetingComponent implements OnInit {

  meeting: Meeting;
  meetingID: number;
  loading: boolean = false;
  notesMode: boolean = false;

  quillConfig = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['code-block'],
        //  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        //  [{ 'direction': 'rtl' }],                         // text direction

        //  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'align': [] }],

        //  ['clean'],                                         // remove formatting button

        //  ['link'],
        ['link', 'image', 'video']
      ],
    },
  }
  onSelectionChanged = (event: SelectionChange) => {
    if(event.oldRange == null) {
      this.onFocus();
    }
    if(event.range == null) {
      this.onBlur();
    }
  }

  onContentChanged = (event: ContentChange) => {
    // console.log(event.html);
  }

  onFocus = () => {
    console.log("On Focus");
  }
  onBlur = () => {
    console.log("Blurred");
  }

  addNotesForm: FormGroup;
  loadingBtn: boolean = false;

  formSubmit: boolean = false;
  formProcessed: boolean = false;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private appService: AppService,
              private formBuilder: FormBuilder,
              private router: Router) { }

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



    this.addNotesForm = this.formBuilder.group({
      notes: ['', Validators.required],
    });
  }

  submitForm(){
    this.loadingBtn = true;

    this.formProcessed = true;
    this.formSubmit = true;
    if (this.addNotesForm.invalid) {
      this.formSubmit = false;
      this.loadingBtn = false;
      return;
    }

    const formData = new FormData();
    formData.append(`description`, this.addNotesForm.value['notes']);

    this.userService.addMeetingNotes(this.meetingID, formData).subscribe(
      next => {
        if(next.status){
          this.appService.swalFire('Notes added successfully!', 'success');
          this.formSubmit = false;
          this.addNotesForm.reset();
          this.router.navigate(['/user/meeting']);
        }else{
          this.appService.swalFire(next.message, 'error');
        }
        this.loadingBtn = false;
      },
      error => {
        this.loadingBtn = false;
        this.appService.swalFire('Error Occurred while adding notes', 'error');
      }
    );
  }

}
