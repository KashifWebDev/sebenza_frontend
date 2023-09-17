import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {
  ApiResponse,
  Meeting,
  News,
  Ticket,
  ticketReplies,
  User,
  Task,
  taskNote,
  Calender,
  expenseType,
  expense,
  accountType,
  order,
  invoice,
  userProfile,
  payFrequency,
  salary,
  withdraw,
  vat, bank
} from "../../../core/interfaces/interfaces";
import {environment} from "../../../../environments/environment";
import {date} from "ngx-custom-validators/src/app/date/validator";

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

  getCalenders(): Observable<ApiResponse<{calenders: Calender[]}>>{
    return this.http.get<ApiResponse<{ calenders: Calender[]}>>(
      environment.backendURI+`/user/calenders`
    );
  }

  submitAddCalender(formData: FormData): Observable<ApiResponse<{ calenders: Calender }>>{
    return this.http.post<ApiResponse<{calenders: Calender}>>(
      environment.backendURI+`/user/calenders`,
      formData
    );
  }

  delCalender(id: number): Observable<ApiResponse<{calenders: Calender}>>{
    return this.http.delete<any>(environment.backendURI+`/user/calenders/${id}`);
  }

  addMeetingNotes(meetingID: number, formData: FormData): Observable<ApiResponse<any>>{
    return this.http.post<ApiResponse<any>>(
      environment.backendURI+`/user/meting/${meetingID}/addnote`,
      formData
    );
  }

  getExpenseTypes(): Observable<ApiResponse<{expensetypes: expenseType[]}>>{
    return this.http.get<ApiResponse<{ expensetypes: expenseType[]}>>(
      environment.backendURI+`/user/expensetypes`
    );
  }

  addNewExpenseTypeSubmit(formData: FormData): Observable<ApiResponse<{ expensetypes: expenseType }>>{
    return this.http.post<ApiResponse<{expensetypes: expenseType}>>(
      environment.backendURI+'/user/expensetypes',
      formData
    );
  }

  getAllExpense(): Observable<expense[]>{
    return this.http.get<ApiResponse<{ expenses: expense[]}>>(
      environment.backendURI+`/user/expenses`
    ).pipe(
      map(response => {
        if(response.data?.expenses && response.data.expenses.length){
          return response.data.expenses.map(expense => ({
            ...expense,
            created_at: expense.created_at.split('T')[0] // Extract only the date part
          }));
        }else{
          console.log('nbo');
          throw new Error("No expenses found");
        }
      })
    );
  }

  deleteExpenseSubmit(id: number): Observable<ApiResponse<{ accounttype: accountType }>>{
    return this.http.delete<ApiResponse<{accounttype: accountType}>>(
      environment.backendURI+`/user/expenses/${id}`
    );
  }

  addNewExpenseSubmit(formData: FormData): Observable<ApiResponse<{ expenses: expense }>>{
    return this.http.post<ApiResponse<{expenses: expense}>>(
      environment.backendURI+'/user/expenses',
      formData
    );
  }

  getSingleExpense(id: number): Observable<ApiResponse<{ expenses: expense}>>{
    return this.http.get<ApiResponse<{ expenses: expense}>>(
      environment.backendURI+`/user/expenses/${id}/edit`
    )
  }

  getOrders(): Observable<ApiResponse<{ order: order[]}>>{
    return this.http.get<ApiResponse<{ order: order[]}>>(
      environment.backendURI+`/user/orders`
    );
  }

  getSingleOrder(id: number): Observable<ApiResponse<{ order: order}>>{
    return this.http.get<ApiResponse<{ order: order}>>(
      environment.backendURI+`/user/orders/${id}/edit`
    )
  }

  updateSubscription(formData: FormData): Observable<ApiResponse<{ invoice: invoice }>>{
    return this.http.post<ApiResponse<{invoice: invoice}>>(
      environment.backendURI+'/user/order/update',
      formData
    );
  }

  getInvoices(): Observable<ApiResponse<{ invoices: invoice[]}>>{
    return this.http.get<ApiResponse<{ invoices: invoice[]}>>(
      environment.backendURI+`/user/invoices`
    );
  }

  getInvoiceByID(id: number): Observable<ApiResponse<{ invoices: invoice}>>{
    return this.http.get<ApiResponse<{ invoices: invoice}>>(
      environment.backendURI+`/user/invoices/${id}/edit`
    )
  }

  getProfileDetails(): Observable<ApiResponse<{user: userProfile}>>{
    return this.http.get<ApiResponse<{user: userProfile}>>(
      environment.backendURI+`/user/view-profile`
    );
  }

  updateProfileDetails(formData: FormData): Observable<ApiResponse<{ user: userProfile }>>{
    return this.http.post<ApiResponse<{user: userProfile}>>(
      environment.backendURI+'/user/update-profile',
      formData
    );
  }

  inviteUserByEmail(formData: FormData): Observable<ApiResponse<{ user: any }>>{
    return this.http.post<ApiResponse<{user: any}>>(
      environment.backendURI+'/user/add-by',
      formData
    );
  }

  bulkImport(formData: FormData): Observable<ApiResponse<any>>{
    return this.http.post<ApiResponse<any>>(
      environment.backendURI+'/user/import',
      formData
    );
  }

  addNewOrder(formData: FormData): Observable<ApiResponse<{ invoice: invoice }>>{
    return this.http.post<ApiResponse<{invoice: invoice}>>(
      environment.backendURI+'/user/orders',
      formData
    );
  }

  getAccTypes(): Observable<ApiResponse<{accounttypes: accountType[]}>>{
    return this.http.get<any>(environment.backendURI+'/gettypes');
  }

  applyVoucher(formData: FormData): Observable<ApiResponse<{ invoice: invoice }>>{
    return this.http.post<ApiResponse<{invoice: invoice}>>(
      environment.backendURI+'/user/order/use-promo',
      formData
    );
  }

  getAllPaymentFrequency(): Observable<ApiResponse<{paymentfrequencys: payFrequency[]}>>{
    return this.http.get<any>(environment.backendURI+'/user/paymentfrequencys');
  }

  deletePayFrequency(id: number): Observable<ApiResponse<{ paymentfrequencys: payFrequency }>>{
    return this.http.delete<ApiResponse<{paymentfrequencys: payFrequency}>>(
      environment.backendURI+`/user/paymentfrequencys/${id}`
    );
  }

  addNewFrequency(formData: FormData): Observable<ApiResponse<{ paymentfrequencys: payFrequency }>>{
    return this.http.post<ApiResponse<{paymentfrequencys: payFrequency}>>(
      environment.backendURI+'/user/paymentfrequencys',
      formData
    );
  }

  getAllSalaries(): Observable<ApiResponse<{ salarys: salary[] }>>{
    return this.http.get<ApiResponse<{salarys: salary[]}>>(
      environment.backendURI+'/user/salaries'
    );
  }

  deleteSalary(id: number): Observable<ApiResponse<{ salarys: salary }>>{
    return this.http.delete<ApiResponse<{salarys: salary}>>(
      environment.backendURI+`/user/salaries/${id}`
    );
  }

  fetchSingleSalary(id: number): Observable<ApiResponse<{salarys: salary}>>{
    return this.http.get<ApiResponse<{ salarys: salary }>>(
      environment.backendURI+`/user/salaries/${id}/edit`
    );
  }

  addNewSalary(formData: FormData): Observable<ApiResponse<{ salarys: salary}>>{
    return this.http.post<ApiResponse<{salarys: salary}>>(
      environment.backendURI+'/user/salaries',
      formData
    );
  }

  editSalary(formData: FormData, id: number): Observable<ApiResponse<{ salarys: salary}>>{
    return this.http.post<ApiResponse<{salarys: salary}>>(
      environment.backendURI+`/user/salary/update/${id}`,
      formData
    );
  }

  getCurrentUserSalary(): Observable<ApiResponse<{ salarys: salary }>>{
    return this.http.get<ApiResponse<{salarys: salary}>>(
      environment.backendURI+'/user/my/salary'
    );
  }

  getAllWithdraws(): Observable<ApiResponse<{ withdrews: withdraw[] }>>{
    return this.http.get<ApiResponse<{withdrews: withdraw[] }>>(
      environment.backendURI+'/user/withdrews'
    );
  }

  getCurrentUserWithdraws(): Observable<ApiResponse<{ withdrews: withdraw[] }>>{
    return this.http.get<ApiResponse<{withdrews: withdraw[] }>>(
      environment.backendURI+'/user/my/withdrew'
    );
  }

  withdrawRequest(formData: FormData): Observable<ApiResponse<{ withdrews: withdraw }>>{
    return this.http.post<ApiResponse<{withdrews: withdraw}>>(
      environment.backendURI+'/user/withdrews',
      formData
    );
  }

  fetchSingleWithdraw(id: number): Observable<ApiResponse<{withdrews: withdraw}>>{
    return this.http.get<ApiResponse<{ withdrews: withdraw }>>(
      environment.backendURI+`/user/withdrews/${id}/edit`
    );
  }

  updateWithdrawRequest(formData: FormData, id: number): Observable<ApiResponse<{ withdrews: withdraw }>>{
    return this.http.post<ApiResponse<{ withdrews: withdraw }>>(
      environment.backendURI+`/user/withdrew/update/${id}`,
      formData
    );
  }

  paymentSuccess(formData: FormData): Observable<ApiResponse<any>>{
    return this.http.post<ApiResponse<any>>(
      environment.backendURI+`/user/paypal-success`,
      formData
    );
  }

  getVatList(): Observable<ApiResponse<{ vattaxs: vat }>>{
    return this.http.get<ApiResponse<{vattaxs: vat }>>(
      environment.backendURI+'/user/vattaxs'
    );
  }

  updateVat(formData: FormData): Observable<ApiResponse<{ vattaxs: vat }>>{
    return this.http.post<ApiResponse<{ vattaxs: vat }>>(
      environment.backendURI+`/user/vattax/update`,
      formData
    );
  }

  addVat(formData: FormData): Observable<ApiResponse<{ vattaxs: vat }>>{
    return this.http.post<ApiResponse<{ vattaxs: vat }>>(
      environment.backendURI+`/user/vattaxs`,
      formData
    );
  }

  getCurrentUserBanks(): Observable<ApiResponse<{ banks: bank[]}>>{
    return this.http.get<ApiResponse<{ banks: bank[]}>>(
      environment.backendURI+`/user/banks`
    );
  }

  updateBank(formData: FormData, id: number): Observable<ApiResponse<{ banks: bank }>>{
    return this.http.post<ApiResponse<{ banks: bank }>>(
      environment.backendURI+`/user/bank/update/${id}`,
      formData
    );
  }

}
