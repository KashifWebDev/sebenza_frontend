import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  accountType,
  ApiResponse,
  basicSettings,
  invoice,
  News,
  order,
  Package,
  promoCode,
  role,
  Ticket,
  ticketReplies,
  User,
  userProfile,
  WhatsApp
} from "../../../core/interfaces/interfaces";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {AuthService} from "../auth/auth.service";
import {UserRole} from "../../../core/roles/UserRole";

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getProfileDetails(): Observable<ApiResponse<{user: userProfile}>>{
    return this.http.get<ApiResponse<{user: userProfile}>>(
      environment.backendURI+`/admin/view-profile`
    );
  }

  updateProfileDetails(formData: FormData): Observable<ApiResponse<{ user: userProfile }>>{
    return this.http.post<ApiResponse<{user: userProfile}>>(
      environment.backendURI+'/admin/update-profile',
      formData
    );
  }

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

  getPromoCodes(): Observable<ApiResponse<{promocodes: promoCode[]}>>{
    return this.http.get<any>(environment.backendURI+`/admin/promocodes`);
  }

  submitPromoCode(formData: FormData): Observable<ApiResponse<{promocodes: promoCode[]}>>{
    return this.http.post<ApiResponse<{promocodes: promoCode[]}>>(
      environment.backendURI+'/admin/promocodes',
      formData
    );
  }

  deletePromoCodeSubmit(id: number): Observable<ApiResponse<{promocodes: promoCode[]}>>{
    return this.http.delete<ApiResponse<{promocodes: promoCode[]}>>(
      environment.backendURI+`/admin/promocodes/${id}`
    );
  }

  getPromoCodeById(id: number): Observable<ApiResponse<{promocodes: promoCode}>>{
    return this.http.get<any>(environment.backendURI+`/admin/promocodes/${id}/edit`);
  }

  editPromoCodeSubmit(formData: FormData, id: number): Observable<ApiResponse<{promocodes: promoCode }>>{
    return this.http.post<ApiResponse<{promocodes: promoCode}>>(
      environment.backendURI+`/admin/promocode/update/${id}`,
      formData
    );
  }

  getInvoices(): Observable<ApiResponse<{ invoices: invoice[]}>>{
    return this.http.get<ApiResponse<{ invoices: invoice[]}>>(
      environment.backendURI+`/admin/invoices`
    );
  }

  getInvoiceByID(id: number): Observable<ApiResponse<{ invoices: invoice}>>{
    return this.http.get<ApiResponse<{ invoices: invoice}>>(
      environment.backendURI+`/admin/invoices/${id}/edit`
    )
  }

  getOrders(): Observable<ApiResponse<{ orders: order[]}>>{
    return this.http.get<ApiResponse<{ orders: order[]}>>(
      environment.backendURI+`/admin/orders`
    );
  }

  getSingleOrder(id: number): Observable<ApiResponse<{ order: order}>>{
    return this.http.get<ApiResponse<{ order: order}>>(
      environment.backendURI+`/admin/orders/${id}/edit`
    )
  }

  dashboardStats(): Observable<ApiResponse<any>>{
    var role = this.authService.getUserRole();
    var qry = role == UserRole.superUser ? '?isAdmin=1' : ''

    return this.http.get<ApiResponse<any>>(
      environment.backendURI+`/user/my/history${qry}`
    )
  }
}
