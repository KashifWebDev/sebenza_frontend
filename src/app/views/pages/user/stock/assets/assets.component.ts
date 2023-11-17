import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {asset} from "../../../../../core/interfaces/interfaces";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../user.service";
import {AppService} from "../../../../../app.service";
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit {
  assets: asset[] = [];
  loading: boolean = true;

  ColumnMode = ColumnMode;
  deleteLoading: boolean = false;
  filteredData: asset[] = [...this.assets];
  searchText = '';
  modalReference: NgbModalRef;
  @ViewChild('basicModal', { static: true }) editModal: TemplateRef<any> | NgbModalRef;
  @ViewChild('saveModalHtml', { static: true }) saveModalHtml: TemplateRef<any> | NgbModalRef;
  editAsset: asset | null = null;
  loadingBtn: boolean = false;
  editAssetForm: FormGroup;
  formProcessed: boolean = false;
  fileToUpload: File;
  excelLoading: boolean = false;

  processExcel(){
    this.excelLoading = true;
    this.userService.exportExcel('assets').subscribe(res => {
      window.location.href=res.data.excel.data_file;
      this.excelLoading = false;
    })
  }

  constructor(private userService: UserService, private appService: AppService,
              private modalService: NgbModal, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.fetchProducts();
    this.editAssetForm = this.formBuilder.group({
      asset_name: ['', Validators.required],
      asset_description: ['', Validators.required],
      quantity: ['', Validators.required],
      purchese_date: ['', Validators.required],
      purchese_value: ['', Validators.required],
      currency: ['', Validators.required],
      attachment: ['', Validators.required],
    });
  }

  filterData() {
    if (this.searchText.trim() !== '') {
      const searchTerms = this.searchText.toLowerCase().split(' ');

      this.filteredData = this.assets.filter((item: any) => {
        const itemValues = Object.values(item).map((value: any) => {
          if (value !== null && value !== undefined) {
            return value.toString().toLowerCase();
          }
          return '';
        });
        return searchTerms.every(term => itemValues.some(value => value.includes(term)));
      });
    } else {
      this.filteredData = [...this.assets];
    }
  }

  fetchProducts(){
    this.userService.getAssets().subscribe(
      res => {
        if(res.status && res.data?.assets.length){
          this.assets = res.data.assets;
          this.filterData();
        }
        this.loading = false;
      },
      error => {
        this.appService.swalFire('Error occurred while listing assets', 'error');
        this.loading = false;
      }
    );
  }

  get form() {
    return this.editAssetForm.controls;
  }

  openDelModal(product: asset){
    this.editAsset = product;
    this.editAssetForm.patchValue({
      asset_name: product.asset_name,
      asset_description: product.asset_description,
      quantity: product.quantity,
      purchese_date: product.purchese_date,
      purchese_value: product.purchese_value,
      currency: product.currency,
      attachment: product.attachment,
    });
    this.modalReference = this.modalService.open(this.editModal, {});
  }

  confirmSaveModal(){
    this.loadingBtn = true;

    let formData: FormData = new FormData();
    formData.append('asset_name', this.editAssetForm.controls['asset_name'].value);
    formData.append('asset_description', this.editAssetForm.controls['asset_description'].value);
    formData.append('quantity', this.editAssetForm.controls['quantity'].value);
    formData.append('purchese_date', this.editAssetForm.controls['purchese_date'].value);
    formData.append('purchese_value', this.editAssetForm.controls['purchese_value'].value);
    formData.append('currency', this.editAssetForm.controls['currency'].value);
    if(this.fileToUpload) formData.append('attachment', this.fileToUpload);

    if(this.editAsset){
      this.userService.updateAsset(this.editAsset.id, formData).subscribe(
        data => {
          if(data.status){
            this.editAssetForm.reset();
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
      this.userService.addAsset(formData).subscribe(
        data => {
          if(data.status){
            this.editAssetForm.reset();
            this.appService.swalFire('Asset added successfully', 'success');
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
    this.editAssetForm.reset();
    this.editAsset = null;
    this.modalReference = this.modalService.open(this.saveModalHtml, {});
  }
}
