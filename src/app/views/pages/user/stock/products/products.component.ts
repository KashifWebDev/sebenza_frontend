import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {UserService} from "../../user.service";
import {AppService} from "../../../../../app.service";
import {product} from "../../../../../core/interfaces/interfaces";
import { ColumnMode } from '@swimlane/ngx-datatable';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: product[] = [];
  loading: boolean = true;

  ColumnMode = ColumnMode;
  deleteLoading: boolean = false;
  filteredData: product[] = [...this.products];
  searchText = '';
  modalReference: NgbModalRef;
  @ViewChild('basicModal', { static: true }) editModal: TemplateRef<any> | NgbModalRef;
  @ViewChild('saveModalHtml', { static: true }) saveModalHtml: TemplateRef<any> | NgbModalRef;
  editProduct: product | null = null;
  loadingBtn: boolean = false;
  editProductForm: FormGroup;
  formProcessed: boolean = false;
  fileToUpload: File;
  excelLoading: boolean = false;

  processExcel(){
    this.excelLoading = true;
    this.userService.exportExcel('products').subscribe(res => {
      window.location.href=res.data.excel.data_file;
      this.excelLoading = false;
    })
  }

  constructor(private userService: UserService, private appService: AppService,
              private modalService: NgbModal, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.fetchProducts();
    this.editProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      status: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  filterData() {
    if (this.searchText.trim() !== '') {
      const searchTerms = this.searchText.toLowerCase().split(' ');

      this.filteredData = this.products.filter((item: any) => {
        const itemValues = Object.values(item).map((value: any) => {
          if (value !== null && value !== undefined) {
            return value.toString().toLowerCase();
          }
          return '';
        });
        return searchTerms.every(term => itemValues.some(value => value.includes(term)));
      });
    } else {
      this.filteredData = [...this.products];
    }
  }

  fetchProducts(){
    this.userService.getProducts().subscribe(
      res => {
        if(res.status && res.data?.products.length){
          this.products = res.data.products;
          this.filterData();
        }
        this.loading = false;
      },
      error => {
        this.appService.swalFire('Error occurred while listing products', 'error');
        this.loading = false;
      }
    );
  }

  get form() {
    return this.editProductForm.controls;
  }

  openDelModal(product: product){
    this.editProduct = product;
    this.editProductForm.patchValue({
      name: product.ProductName,
      brand: product.BrandName,
      status: product.status,
      image: product.ProductImage
    });
    this.modalReference = this.modalService.open(this.editModal, {});
  }

  confirmSaveModal(){
    this.loadingBtn = true;

    let formData: FormData = new FormData();
    formData.append('ProductName', this.editProductForm.controls['name'].value);
    formData.append('BrandName', this.editProductForm.controls['brand'].value);
    formData.append('status', this.editProductForm.controls['status'].value);
    if(this.fileToUpload) formData.append('ProductImage', this.fileToUpload);

    if(this.editProduct){
      this.userService.updateProducts(this.editProduct.id, formData).subscribe(
        data => {
          if(data.status){
            this.editProductForm.reset();
            this.appService.swalFire('Product update successfully', 'success');
            this.fetchProducts();
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
      this.userService.addProduct(formData).subscribe(
        data => {
          if(data.status){
            this.editProductForm.reset();
            this.appService.swalFire('Product added successfully', 'success');
            this.fetchProducts();
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
    this.editProductForm.reset();
    this.editProduct = null;
    this.modalReference = this.modalService.open(this.saveModalHtml, {});
  }
}
