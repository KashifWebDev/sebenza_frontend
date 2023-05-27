import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponse, News} from "../../../core/interfaces/interfaces";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllNewsByUserId(id: number): Observable<ApiResponse<{news: News[]}>>{
    return this.http.get<ApiResponse<{ news: News[]}>>(
      environment.backendURI+`/user/newsupdates/${id}`
    );
  }

  getNewsBySlug(slug: string): Observable<ApiResponse<{news: News}>>{
    return this.http.post<ApiResponse<{ news: News }>>(
      environment.backendURI+`/user/newsupdate/view/${slug}`,
      null
    );
  }

}
