import { Component, OnInit } from '@angular/core';
import {ContentChange, SelectionChange} from "ngx-quill";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {CarrierService} from "../carrier.service";
import {Project} from "../../../../dataTypes.interface";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  htmlText = `<p> Enter Project Details... </p>`;
  projectTags = ['Angular', 'Laravel'];
  projectForm: FormGroup;
  test: boolean = true;

  constructor(private formBuilder: FormBuilder,
              private service: CarrierService) {
  }

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      client: ['', [Validators.required]],
      url: ['', [Validators.required]],
      start_date: ['', [Validators.required]],
      tags: [this.projectTags, [Validators.required]],
      about: [this.htmlText, [Validators.required]],
    });

    setInterval(()=> {
      this.test = !this.test;
      console.log(this.test);
    }, 1000);
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

  onAdd(item: any) {
    console.log('tag added: value is ' + item.value);
  }

  onSelect(item: any) {
    console.log('tag selected: value is ' + item);
  }

  onTextChange(text: any) {
    console.log('text changed: value is ' + text);
  }

  resetForm(){
    this.projectForm.reset();
  }

  submitForm(){
    console.log(this.projectForm.value);
    if(!this.projectForm.valid){
      Swal.fire({
        title: 'Please fill all the required fields',
        icon: 'warning'
      });
      return ;
    }

    var formBody: Project = {
      title: this.projectForm.get('title')?.value,
      client: this.projectForm.get('client')?.value,
      url: this.projectForm.get('url')?.value,
      tags: this.projectForm.get('tags')?.value,
      about: this.projectForm.get('about')?.value,
      start_date: this.projectForm.get('start_date')?.value
    };

    this.service.$addProject(formBody).subscribe(data => {
      console.log(data);
    });
  }

}
