import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponse, News, Ticket, ticketReplies, User} from "../../../core/interfaces/interfaces";
import {environment} from "../../../../environments/environment";
import {Tick} from "chart.js";

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

  getUserTickets(): Observable<ApiResponse<{supporttickets: Ticket[]}>>{
    return this.http.get<ApiResponse<{ supporttickets: Ticket[]}>>(
      environment.backendURI+`/user/supporttickets`
    );
  }

  submitTicket(formData: FormData): Observable<ApiResponse<{supporttickets: Ticket}>>{
    return this.http.post<ApiResponse<{ supporttickets: Ticket }>>(
      environment.backendURI+`/user/supporttickets`,
      formData
    );
  }

  getTicketsById(id: number): Observable<ApiResponse<{supporttickets: Ticket, replays: ticketReplies[], replied_from: User}>>{
    return this.http.get<any>(environment.backendURI+`/user/supporttickets/${id}`);
  }

  submitTicketMessage(formData: FormData, id: number): Observable<ApiResponse<{ supporttickets: Ticket, replay: ticketReplies }>>{
    return this.http.post<ApiResponse<{supporttickets: Ticket, replay: ticketReplies}>>(
      environment.backendURI+`/user/replay/ticket/${id}`,
      formData
    );
  }

}
