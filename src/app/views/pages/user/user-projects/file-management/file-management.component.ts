import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {asset, file} from "../../../../../core/interfaces/interfaces";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../user.service";
import {AppService} from "../../../../../app.service";
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-file-management',
  templateUrl: './file-management.component.html',
  styleUrls: ['./file-management.component.scss']
})
export class FileManagementComponent implements OnInit {
  files: file[] = [];
  loading: boolean = true;

  ColumnMode = ColumnMode;
  deleteLoading: boolean = false;
  filteredData: file[] = [...this.files];
  searchText = '';
  modalReference: NgbModalRef;
  @ViewChild('basicModal', { static: true }) editModal: TemplateRef<any> | NgbModalRef;
  @ViewChild('saveModalHtml', { static: true }) saveModalHtml: TemplateRef<any> | NgbModalRef;
  editAsset: file | null = null;
  loadingBtn: boolean = false;
  editFileForm: FormGroup;
  formProcessed: boolean = false;
  fileToUpload: File;

  constructor(private userService: UserService, private appService: AppService,
              private modalService: NgbModal, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.fetchFiles();
    this.editFileForm = this.formBuilder.group({
      title: ['', Validators.required],
      text: ['', Validators.required],
      file: ['', Validators.required]
    });
  }

  filterData() {
    if (this.searchText.trim() !== '') {
      const searchTerms = this.searchText.toLowerCase().split(' ');

      this.filteredData = this.files.filter((item: any) => {
        const itemValues = Object.values(item).map((value: any) => {
          if (value !== null && value !== undefined) {
            return value.toString().toLowerCase();
          }
          return '';
        });
        return searchTerms.every(term => itemValues.some(value => value.includes(term)));
      });
    } else {
      this.filteredData = [...this.files];
    }
  }

  fetchFiles(){
    this.userService.getFiles().subscribe(
      res => {
        if(res.status && res.data?.files.length){
          this.files = res.data.files;
          this.filterData();
        }
        this.loading = false;
      },
      error => {
        this.appService.swalFire('Error occurred while listing files', 'error');
        this.loading = false;
      }
    );
  }

  get form() {
    return this.editFileForm.controls;
  }

  openDelModal(file: file){
    this.editAsset = file;
    this.editFileForm.patchValue({
      title: file.title,
      text: file.text,
      file: file.file,
    });
    this.modalReference = this.modalService.open(this.editModal, {});
  }

  confirmSaveModal(){
    this.loadingBtn = true;

    let formData: FormData = new FormData();
    formData.append('title', this.editFileForm.controls['title'].value);
    formData.append('text', this.editFileForm.controls['text'].value);
    if(this.fileToUpload) formData.append('file', this.fileToUpload);

    if(this.editAsset){
      this.userService.updateFile(this.editAsset.id, formData).subscribe(
        data => {
          if(data.status){
            this.editFileForm.reset();
            this.appService.swalFire('File update successfully', 'success');
            this.fetchFiles();
            this.modalReference.close();
          }else{
            this.appService.swalFire(data.message, 'error');
          }
          this.loadingBtn = false;
        },
        (error) => {
          this.loadingBtn = false;
          this.appService.swalFire('An error occurred while performing action', 'error');
        }
      );
    }else{
      this.userService.addFile(formData).subscribe(
        data => {
          if(data.status){
            this.editFileForm.reset();
            this.appService.swalFire('File added successfully', 'success');
            this.fetchFiles();
            this.modalReference.close();
          }else{
            this.appService.swalFire(data.message, 'error');
          }
          this.loadingBtn = false;
        },
        (error) => {
          this.loadingBtn = false;
          this.appService.swalFire('An error occurred while performing action', 'error');
        }
      );
    }
  }

  handleFileInput(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.fileToUpload = fileInput.files[0];
    }
  }

  saveModal(){
    this.editFileForm.reset();
    this.editAsset = null;
    this.modalReference = this.modalService.open(this.saveModalHtml, {});
  }
}
