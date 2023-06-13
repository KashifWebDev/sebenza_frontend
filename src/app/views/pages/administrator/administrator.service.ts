import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  accountType,
  ApiResponse,
  basicSettings,
  News,
  Package,
  role, Ticket, ticketReplies,
  User, WhatsApp
} from "../../../core/interfaces/interfaces";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {Tick} from "chart.js";

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {

  constructor(private http: HttpClient) { }

  getAllRoles(): Observable<ApiResponse<{roles: role[]}>>{
    return this.http.get<ApiResponse<{ roles: role[] }>>(environment.backendURI+'/admin/userroles');
  }

  fetchUserDetail(id: number): Observable<ApiResponse<{user: User}>>{
    return this.http.get<ApiResponse<{ user: User }>>(
      environment.backendURI+`/user/details/${id}`
    );
  }

  fetchRoleDetail(id: number): Observable<ApiResponse<{role: role}>>{
    return this.http.get<ApiResponse<{ role: role }>>(
      environment.backendURI+`/admin/userroles/${id}/edit`
    );
  }

  fetchAccTypeDetail(id: number): Observable<ApiResponse<{accounttype: accountType}>>{
    return this.http.get<ApiResponse<{ accounttype: accountType }>>(
      environment.backendURI+`/admin/accounttypes/${id}/edit`
    );
  }

  fetchPkgDetail(id: number): Observable<ApiResponse<{accountpackage: Package}>>{
    return this.http.get<ApiResponse<{ accountpackage: Package }>>(
      environment.backendURI+`/admin/accountpackages/${id}/edit`
    );
  }

  getAllPkgs(): Observable<ApiResponse<{accountpackages: Package[]}>>{
    return this.http.get<ApiResponse<{ accountpackages: Package[]}>>(
      environment.backendURI+`/admin/accountpackages`
    );
  }

  getAllUsers(): Observable<ApiResponse<{users: User[]}>>{
    return this.http.get<ApiResponse<{ users: User[] }>>(
      environment.backendURI+'/admin/users'
    );
  }

  addNewRoleSubmit(formData: FormData): Observable<ApiResponse<{ role: role }>>{
    return this.http.post<ApiResponse<{role: role}>>(
      environment.backendURI+'/admin/userroles',
      formData
    );
  }

  addNewAccTypeSubmit(formData: FormData): Observable<ApiResponse<{ accounttype: accountType }>>{
    return this.http.post<ApiResponse<{accounttype: accountType}>>(
      environment.backendURI+'/admin/accounttypes',
      formData
    );
  }

  addNewPkgSubmit(formData: FormData): Observable<ApiResponse<{ accountpackage: Package }>>{
    return this.http.post<ApiResponse<{accountpackage: Package}>>(
      environment.backendURI+'/admin/accountpackages',
      formData
    );
  }

  editRoleSubmit(formData: FormData, id: number): Observable<ApiResponse<{ role: role }>>{
    return this.http.post<ApiResponse<{role: role}>>(
      environment.backendURI+`/admin/userrole/update/${id}`,
      formData
    );
  }

  editAccTypeSubmit(formData: FormData, id: number): Observable<ApiResponse<{ accounttype: accountType }>>{
    return this.http.post<ApiResponse<{accounttype: accountType}>>(
      environment.backendURI+`/admin/accounttype/update`,
      formData
    );
  }

  editPkgSubmit(formData: FormData, id: number): Observable<ApiResponse<{ accountpackage: Package }>>{
    return this.http.post<ApiResponse<{accountpackage: Package}>>(
      environment.backendURI+`/admin/accountpackage/update`,
      formData
    );
  }

  addNewUserSubmit(formData: FormData): Observable<ApiResponse<{ user: User }>>{
    return this.http.post<ApiResponse<{user: User}>>(
      environment.backendURI+'/admin/users',
      formData
    );
  }

  editUserSubmit(formData: FormData, id: number): Observable<ApiResponse<{ user: User }>>{
    return this.http.post<ApiResponse<{user: User}>>(
      environment.backendURI+'/admin/user/update/'+id,
      formData
    );
  }

  deleteUserSubmit(id: number): Observable<ApiResponse<{ user: User }>>{
    return this.http.delete<ApiResponse<{user: User}>>(
      environment.backendURI+`/admin/users/${id}`
    );
  }

  deleteRoleSubmit(id: number): Observable<ApiResponse<{ role: role }>>{
    return this.http.delete<ApiResponse<{role: role}>>(
      environment.backendURI+`/admin/userroles/${id}`
    );
  }

  deleteAccTypeSubmit(id: number): Observable<ApiResponse<{ accounttype: accountType }>>{
    return this.http.delete<ApiResponse<{accounttype: accountType}>>(
      environment.backendURI+`/admin/accounttypes/${id}`
    );
  }

  deletePkgSubmit(id: number): Observable<ApiResponse<{ accountpackage: Package }>>{
    return this.http.delete<ApiResponse<{accountpackage: Package}>>(
      environment.backendURI+`/admin/accountpackages/${id}`
    );
  }

  getAccTypes(): Observable<ApiResponse<{accounttypes: accountType[]}>>{
    return this.http.get<any>(environment.backendURI+'/admin/accounttypes');
  }

  getAllNews(): Observable<ApiResponse<{news: News[]}>>{
    return this.http.get<ApiResponse<{ news: News[]}>>(
      environment.backendURI+`/admin/newsupdates`
    );
  }

  getNewsByID(id: number): Observable<ApiResponse<{news: News}>>{
    return this.http.get<ApiResponse<{ news: News }>>(
      environment.backendURI+`/admin/newsupdates/${id}/edit`
    );
  }

  addNewsSubmit(formData: FormData): Observable<ApiResponse<{ accounttype: accountType }>>{
    return this.http.post<ApiResponse<{accounttype: accountType}>>(
      environment.backendURI+'/admin/newsupdates',
      formData
    );
  }

  deleteNewsSubmit(id: number): Observable<ApiResponse<{ news: News }>>{
    return this.http.delete<ApiResponse<{news: News}>>(
      environment.backendURI+`/admin/newsupdates/${id}`
    );
  }

  editNewsSubmit(formData: FormData, id: number): Observable<ApiResponse<{ news: News }>>{
    return this.http.post<ApiResponse<{news: News}>>(
      environment.backendURI+'/admin/newsupdate/update/'+id,
      formData
    );
  }

  getBasicSettings(): Observable<ApiResponse<{basicinfo: basicSettings}>>{
    return this.http.get<ApiResponse<{ basicinfo: basicSettings }>>(environment.backendURI+'/admin/basicinfos');
  }

  editSetting1Submit(formData: FormData): Observable<ApiResponse<{ basicinfo: basicSettings }>>{
    return this.http.post<ApiResponse<{basicinfo: basicSettings}>>(
      environment.backendURI+`/admin/basicinfo/update`,
      formData
    );
  }

  editSetting2Submit(formData: FormData): Observable<ApiResponse<{ basicinfo: basicSettings }>>{
    return this.http.post<ApiResponse<{basicinfo: basicSettings}>>(
      environment.backendURI+`/admin/seo/meta`,
      formData
    );
  }

  editSetting3Submit(formData: FormData): Observable<ApiResponse<{ basicinfo: basicSettings }>>{
    return this.http.post<ApiResponse<{basicinfo: basicSettings}>>(
      environment.backendURI+`/admin/social/links`,
      formData
    );
  }

  editSetting4Submit(formData: FormData): Observable<ApiResponse<{ basicinfo: basicSettings }>>{
    return this.http.post<ApiResponse<{basicinfo: basicSettings}>>(
      environment.backendURI+`/admin/pixel/analytics`,
      formData
    );
  }

  getWhatsappNumbers(): Observable<ApiResponse<{whatsapp: WhatsApp[]}>>{
    return this.http.get<any>(environment.backendURI+'/admin/whatsapps');
  }

  getWhatsappById(id: number): Observable<ApiResponse<{whatsapp: WhatsApp}>>{
    return this.http.get<ApiResponse<{whatsapp: WhatsApp}>>(
      environment.backendURI+`/admin/whatsapps/${id}/edit`
    );
  }

  addNewWhatsappSubmit(formData: FormData): Observable<ApiResponse<{whatsapp: WhatsApp }>>{
    return this.http.post<ApiResponse<{whatsapp: WhatsApp}>>(
      environment.backendURI+'/admin/whatsapps',
      formData
    );
  }

  editWhatsappSubmit(formData: FormData, id: number): Observable<ApiResponse<{whatsapp: WhatsApp }>>{
    return this.http.post<ApiResponse<{whatsapp: WhatsApp}>>(
      environment.backendURI+`/admin/whatsapp/update/${id}`,
      formData
    );
  }

  deleteWhatsappSubmit(id: number): Observable<ApiResponse<{ whatsapp: WhatsApp }>>{
    return this.http.delete<ApiResponse<{whatsapp: WhatsApp}>>(
      environment.backendURI+`/admin/whatsapps/${id}`
    );
  }

  getAllTickets(): Observable<ApiResponse<{supporttickets: Ticket[]}>>{
    return this.http.get<any>(environment.backendURI+'/admin/supporttickets');
  }

  getTicketsById(id: number): Observable<ApiResponse<{supporttickets: Ticket, replays: ticketReplies[]}>>{
    return this.http.get<any>(environment.backendURI+`/admin/supportticket/edit/${id}`);
  }

  adminSubmitTicketMessage(formData: FormData, id: number): Observable<ApiResponse<{ supporttickets: Ticket, replay: ticketReplies }>>{
    return this.http.post<ApiResponse<{supporttickets: Ticket, replay: ticketReplies}>>(
      environment.backendURI+`/admin/replay/ticket/${id}`,
      formData
    );
  }

  adminCloseTicket(formData: FormData, id: number): Observable<ApiResponse<{ supporttickets: Ticket }>>{
    return this.http.post<ApiResponse<{supporttickets: Ticket}>>(
      environment.backendURI+`/admin/supportticket/update/${id}`,
      formData
    );
  }
}
