import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Project} from "../../../dataTypes.interface";

@Injectable({
  providedIn: 'root'
})
export class CarrierService {

  constructor(private http: HttpClient) { }

  $addProject = (body: Project) => {
    return this.http.post(
      environment.backendURI+'/projects',
      body
    );
  }
}
