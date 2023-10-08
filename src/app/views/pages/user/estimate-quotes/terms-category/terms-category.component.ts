import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {payFrequency, termsConditionCategory} from "../../../../../core/interfaces/interfaces";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../user.service";
import {AppService} from "../../../../../app.service";

@Component({
  selector: 'app-terms-category',
  templateUrl: './terms-category.component.html',
  styleUrls: ['./terms-category.component.scss']
})
export class TermsCategoryComponent implements OnInit {

  termsConditionCategories: termsConditionCategory[];
  loading: boolean = true;
  modalReference: NgbModalRef;
  @ViewChild('basicModal', { static: true }) deleteModal: TemplateRef<any> | NgbModalRef;
  @ViewChild('delModal', { static: true }) delModal: TemplateRef<any> | NgbModalRef;
  btnLoading: boolean = false;
  addNewCatForm: FormGroup;
  formSubmit: boolean = false;
  formProcessed: boolean = false;
  loadingBtn: boolean = false;
  delCatID: number;

  constructor(private userService: UserService, private modalService: NgbModal,
              private formBuilder: FormBuilder, private appService: AppService) { }

  ngOnInit(): void {
    this.addNewCatForm = this.formBuilder.group({
      cat: ['', Validators.required]
    });

    this.getPageData();
  }

  getPageData(){
    this.loading = true;
    this.userService.getTermsConditionsCategories().subscribe(response => {
      if (response.status && response.data?.termscategorys) {
        this.termsConditionCategories = response.data.termscategorys;
        this.loading = false;
      }
    });
  }

  get form() {
    return this.addNewCatForm.controls;
  }

  modifyDate(date: string){
    return date.split('T')[0];
  }

  openModal(){
    this.modalReference = this.modalService.open(this.deleteModal, {});
  }

  openDelModal(id: number){
    this.delCatID = id;
    this.modalReference = this.modalService.open(this.delModal, {});
  }

  confirmSaveModal(){
    this.btnLoading = true;

    let formData: FormData = new FormData();
    formData.append('category_name', this.addNewCatForm.controls['cat'].value);
    formData.append('status', 'Active');

    this.userService.addNewTermCategory(formData).subscribe(
      data => {
        if(data.status){
          this.addNewCatForm.reset();
          this.appService.swalFire('Category created Successfully', 'success');
          this.getPageData();
          this.modalReference.close();
        }else{
          this.appService.swalFire(data.message, 'error');
        }
        this.btnLoading = false;
      },
      (error) => {
        this.btnLoading = false;
        this.appService.swalFire('An error occurred while performing action', 'error');
      }
    );
  }

  confirmModal(){
    this.btnLoading = true;
    this.userService.deleteTermsConditionsCategories(this.delCatID).subscribe(
      data => {
        if(data.status){
          this.appService.swalFire('Category deleted Successfully', 'success');
          this.getPageData();
          this.modalReference.close();
        }else{
          this.appService.swalFire(data.message, 'error');
        }
        this.btnLoading = false;
      },
      (error) => {
        this.btnLoading = false;
        this.appService.swalFire('An error occurred while performing action', 'error');
      }
    );
  }

}
