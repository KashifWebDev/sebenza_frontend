import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {UserService} from "../../user.service";
import {accountType, order} from "../../../../../core/interfaces/interfaces";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../../../app.service";

@Component({
  selector: 'app-users-all-orders',
  templateUrl: './users-all-orders.component.html',
  styleUrls: ['./users-all-orders.component.scss']
})
export class UsersAllOrdersComponent implements OnInit {

  orders: order[];
  loading: boolean = true;
  modalReference: NgbModalRef;
  @ViewChild('basicModal', { static: true }) deleteModal: TemplateRef<any> | NgbModalRef;
  btnLoading: boolean = false;
  addNewOrderForm: FormGroup;
  formSubmit: boolean = false;
  formProcessed: boolean = false;
  loadingBtn: boolean = false;
  accountTypes: accountType[];

  constructor(private userService: UserService, private modalService: NgbModal,
              private formBuilder: FormBuilder, private appService: AppService) { }

  ngOnInit(): void {
    this.addNewOrderForm = this.formBuilder.group({
      totalUsers: ['', Validators.required],
      accountType: ['', Validators.required],
    });

    this.getOrders();
  }

  getOrders(){
    this.loading = true;
    this.userService.getOrders().subscribe(response => {
      if (response.status && response.data?.order) {
        this.orders = response.data.order;
        this.loading = false;
      }
    });
  }

  get form() {
    return this.addNewOrderForm.controls;
  }

  modifyDate(date: string){
    return date.split('T')[0];
  }

  openModal(){
    this.modalReference = this.modalService.open(this.deleteModal, {});
    this.userService.getAccTypes().subscribe(
      (response) => {
        if(response.status && response.data?.accounttypes){
          this.accountTypes = response.data.accounttypes;
        }
      }
    );
  }

  confirmModal(){
    this.btnLoading = true;
    const formData = new FormData();
    formData.append(`user_limit_id`, this.addNewOrderForm.value['totalUsers']);
    formData.append(`account_type_id`, this.addNewOrderForm.value['accountType']);
    this.userService.addNewOrder(formData).subscribe(
      data => {
        if(data.status){
          this.appService.swalFire('Order Placed Successfully', 'success');
          this.getOrders();
          this.modalReference.close();
        }else{
          this.appService.swalFire(data.message, 'error');
        }
        this.btnLoading = false;
      },
      (error) => {
        this.btnLoading = false;
        this.appService.swalFire('An error occurred while creating Order', 'error');
      }
    );
  }
}
