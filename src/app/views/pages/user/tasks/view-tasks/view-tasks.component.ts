import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Task, taskNote, User} from "../../../../../core/interfaces/interfaces";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../user.service";
import {AppService} from "../../../../../app.service";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.scss']
})
export class ViewTasksComponent implements OnInit {

  task: Task;
  taskNotes: taskNote[] = [];
  taskID: number;
  loading: boolean = false;
  @ViewChild('basicModal', { static: true }) deleteModal: TemplateRef<any> | NgbModalRef;
  addNoteSubmitLoading: boolean = false;
  modalReference: NgbModalRef;
  addNotesForm: FormGroup;
  formSubmit: boolean = false;
  formProcessed: boolean = false;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private formBuilder: FormBuilder,
              private modalService: NgbModal,
              private appService: AppService){ }

  ngOnInit(): void {
    this.addNotesForm = this.formBuilder.group({
      details: ['', Validators.required]
    });
    this.loading = true;
    this.fetchTaskDetails();
  }

  fetchTaskDetails(){
    this.route.params.subscribe(params => {
      this.taskID = params['id'];
      this.userService.getTaskById(this.taskID).subscribe(
        (res) => {
          if(res.status && res.data?.tasks){
            this.task = res.data.tasks;
            this.taskNotes = res.data.tasks.tasknotes;
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

  get form() {
    return this.addNotesForm.controls;
  }

  openModal() {
    this.modalReference = this.modalService.open(this.deleteModal, {});
  }

  submitForm(){
    this.addNoteSubmitLoading = true;
    this.formProcessed = true;
    if(this.addNotesForm.invalid){
      this.addNoteSubmitLoading = false;
      return;
    }
    let formData = new FormData();
    formData.append('description', this.addNotesForm.controls['details'].value);
    this.userService.submitAddTaskNotes(formData, this.taskID).subscribe(
      data => {
        if(data.status){
          this.fetchTaskDetails();
          this.appService.swalFire('Notes Added Successfully', 'success');
          this.modalReference.close();
        }else{
          this.appService.swalFire(data.message, 'error');
        }
        this.addNoteSubmitLoading = false;
      },
      (error) => {
        this.addNoteSubmitLoading = false;
        this.appService.swalFire('An error occurred while adding Notes', 'error');
      }
    );
  }

}
