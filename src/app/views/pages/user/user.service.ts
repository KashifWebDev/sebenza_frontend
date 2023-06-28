import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {
  ApiResponse,
  Meeting,
  News,
  Ticket,
  ticketReplies,
  User,
  Task,
  taskNote
} from "../../../core/interfaces/interfaces";
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

  getMeetings(): Observable<ApiResponse<{metings: Meeting[]}>>{
    return this.http.get<ApiResponse<{ metings: Meeting[]}>>(
      environment.backendURI+`/user/metings`
    );
  }

  submitAddMeeting(formData: FormData): Observable<ApiResponse<{ meeting: Meeting }>>{
    return this.http.post<ApiResponse<{meeting: Meeting}>>(
      environment.backendURI+`/user/metings`,
      formData
    );
  }

  getMeetingById(id: number): Observable<ApiResponse<{metings: Meeting}>>{
    return this.http.get<any>(environment.backendURI+`/user/metings/${id}/edit`);
  }

  getTask(): Observable<ApiResponse<{tasks: Task[]}>>{
    return this.http.get<ApiResponse<{ tasks: Task[]}>>(
      environment.backendURI+`/user/tasks`
    );
  }

  submitAddTask(formData: FormData): Observable<ApiResponse<{ tasks: Task }>>{
    return this.http.post<ApiResponse<{tasks: Task}>>(
      environment.backendURI+`/user/tasks`,
      formData
    );
  }

  getTaskById(id: number): Observable<ApiResponse<{tasks: Task}>>{
    return this.http.get<any>(environment.backendURI+`/user/tasks/${id}/edit`);
  }

  submitAddTaskNotes(formData: FormData, id: number): Observable<ApiResponse<{ tasknotes: taskNote }>>{
    return this.http.post<ApiResponse<{tasknotes: taskNote}>>(
      environment.backendURI+`/user/task/${id}/addnote`,
      formData
    );
  }

}
