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
  vat, bank, termsConditionCategory, termsCondition, product, asset, warehouse, customer, file
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

  getTermsConditionsCategories(): Observable<ApiResponse<{termscategorys: termsConditionCategory[]}>>{
    return this.http.get<any>(environment.backendURI+'/user/termscategories');
  }

  deleteTermsConditionsCategories(id: number): Observable<ApiResponse<{ termscategorys: termsConditionCategory }>>{
    return this.http.delete<ApiResponse<{termscategorys: termsConditionCategory}>>(
      environment.backendURI+`/user/termscategories/${id}`
    );
  }

  addNewTermCategory(formData: FormData): Observable<ApiResponse<{ termscategorys: termsConditionCategory }>>{
    return this.http.post<ApiResponse<{termscategorys: termsConditionCategory}>>(
      environment.backendURI+'/user/termscategories',
      formData
    );
  }

  getTermsConditions(): Observable<ApiResponse<{termsconditions: termsCondition[]}>>{
    return this.http.get<any>(environment.backendURI+'/user/termsconditions');
  }

  getActiveTermsConditionsTypes(): Observable<ApiResponse<{termscategorys: termsConditionCategory[]}>>{
    return this.http.get<any>(environment.backendURI+'/user/termscondition/getdata');
  }

  deleteTermsConditions(id: number): Observable<ApiResponse<{ termsconditions: termsCondition }>>{
    return this.http.delete<ApiResponse<{termsconditions: termsCondition}>>(
      environment.backendURI+`/user/termsconditions/${id}`
    );
  }

  addNewTerm(formData: FormData): Observable<ApiResponse<{ termsconditions: termsCondition }>>{
    return this.http.post<ApiResponse<{termsconditions: termsCondition}>>(
      environment.backendURI+'/user/termsconditions',
      formData
    );
  }

  addNewQuote(formData: FormData): Observable<ApiResponse<{ estimatequotes: any }>>{
    return this.http.post<ApiResponse<{estimatequotes: any}>>(
      environment.backendURI+'/user/estimatequotes',
      formData
    );
  }

  editQuote(formData: FormData, id: number): Observable<ApiResponse<{ estimatequotes: any }>>{
    return this.http.post<ApiResponse<{estimatequotes: any}>>(
      environment.backendURI+`/user/estimatequote/update/${id}`,
      formData
    );
  }

  getQuotes(): Observable<ApiResponse<{ estimatequotes: any }>>{
    return this.http.get<ApiResponse<{estimatequotes: any}>>(
      environment.backendURI+`/user/estimatequotes`
    );
  }

  getQuoteDetails(id: number): Observable<ApiResponse<{ estimatequotes: any }>>{
    return this.http.get<ApiResponse<{estimatequotes: any}>>(
      environment.backendURI+`/user/estimatequotes/${id}/edit`
    );
  }

  getProducts(): Observable<ApiResponse<{ products: product[] }>>{
    return this.http.get<ApiResponse<{products: product[]}>>(
      environment.backendURI+`/user/products`
    );
  }

  updateProducts(id: number, formData: FormData): Observable<ApiResponse<{ products: product[] }>>{
    return this.http.post<ApiResponse<{products: product[]}>>(
      environment.backendURI+`/user/product/update/${id}`,
      formData
    );
  }

  addProduct(formData: FormData): Observable<ApiResponse<{ products: product }>>{
    return this.http.post<ApiResponse<{products: product}>>(
      environment.backendURI+`/user/products`,
      formData
    );
  }

  updateAsset(id: number, formData: FormData): Observable<ApiResponse<{ assets: asset[] }>>{
    return this.http.post<ApiResponse<{assets: asset[]}>>(
      environment.backendURI+`/user/asset/update/${id}`,
      formData
    );
  }

  addAsset(formData: FormData): Observable<ApiResponse<{ assets: asset }>>{
    return this.http.post<ApiResponse<{assets: asset}>>(
      environment.backendURI+`/user/assets`,
      formData
    );
  }
  getAssets(): Observable<ApiResponse<{ assets: asset[] }>>{
    return this.http.get<ApiResponse<{assets: asset[]}>>(
      environment.backendURI+`/user/assets`
    );
  }


  updateWarehosue(id: number, formData: FormData): Observable<ApiResponse<{ warehouses: warehouse[] }>>{
    return this.http.post<ApiResponse<{warehouses: warehouse[]}>>(
      environment.backendURI+`/user/warehouse/update/${id}`,
      formData
    );
  }
  addWarehosue(formData: FormData): Observable<ApiResponse<{ warehouses: warehouse }>>{
    return this.http.post<ApiResponse<{warehouses: warehouse}>>(
      environment.backendURI+`/user/warehouses`,
      formData
    );
  }
  getWarehosues(): Observable<ApiResponse<{ warehouses: warehouse[] }>>{
    return this.http.get<ApiResponse<{warehouses: warehouse[]}>>(
      environment.backendURI+`/user/warehouses`
    );
  }

  getStock(): Observable<ApiResponse<{ stocks: any[] }>>{
    return this.http.get<ApiResponse<{stocks: any[]}>>(
      environment.backendURI+`/user/stocks`
    );
  }

  updateStock(id: number, formData: FormData): Observable<ApiResponse<{ stocks: any[] }>>{
    return this.http.post<ApiResponse<{stocks: any[]}>>(
      environment.backendURI+`/user/stock/update/${id}`,
      formData
    );
  }

  addStock(formData: FormData): Observable<ApiResponse<{ stocks: any }>>{
    return this.http.post<ApiResponse<{stocks: any}>>(
      environment.backendURI+`/user/stocks`,
      formData
    );
  }

  getSingleStock(id: number): Observable<ApiResponse<{ stocks: any }>>{
    return this.http.get<ApiResponse<{stocks: any}>>(
      environment.backendURI+`/user/stocks/${id}/edit`
    );
  }

  getCustomers(): Observable<ApiResponse<{ customers: customer[] }>>{
    return this.http.get<ApiResponse<{customers: customer[]}>>(
      environment.backendURI+`/user/customers`
    );
  }

  updateCustomer(id: number, formData: FormData): Observable<ApiResponse<{ stocks: customer }>>{
    return this.http.post<ApiResponse<{stocks: customer}>>(
      environment.backendURI+`/user/customer/update/${id}`,
      formData
    );
  }

  addCustomer(formData: FormData): Observable<ApiResponse<{ customers: customer }>>{
    return this.http.post<ApiResponse<{customers: customer}>>(
      environment.backendURI+`/user/customers`,
      formData
    );
  }

  getProjects(): Observable<ApiResponse<{ projects: any[] }>>{
    return this.http.get<ApiResponse<{projects: any[]}>>(
      environment.backendURI+`/user/projects`
    );
  }

  updateProject(id: number, formData: FormData): Observable<ApiResponse<{ projects: any }>>{
    return this.http.post<ApiResponse<{projects: any}>>(
      environment.backendURI+`/user/project/update/${id}`,
      formData
    );
  }

  addProject(formData: FormData): Observable<ApiResponse<{ projects: any }>>{
    return this.http.post<ApiResponse<{projects: any}>>(
      environment.backendURI+`/user/projects`,
      formData
    );
  }

  getFiles(): Observable<ApiResponse<{ files: file[] }>>{
    return this.http.get<ApiResponse<{files: file[]}>>(
      environment.backendURI+`/user/files`
    );
  }

  updateFile(id: number, formData: FormData): Observable<ApiResponse<{ files: file }>>{
    return this.http.post<ApiResponse<{files: file}>>(
      environment.backendURI+`/user/file/update/${id}`,
      formData
    );
  }

  addFile(formData: FormData): Observable<ApiResponse<{ files: file }>>{
    return this.http.post<ApiResponse<{files: file}>>(
      environment.backendURI+`/user/files`,
      formData
    );
  }


  getPOS(): Observable<ApiResponse<{ sales: any[] }>>{
    return this.http.get<ApiResponse<{sales: any[]}>>(
      environment.backendURI+`/user/sales`
    );
  }

  updatePOS(id: number, formData: FormData): Observable<ApiResponse<{ sale: any[] }>>{
    return this.http.post<ApiResponse<{sale: any[]}>>(
      environment.backendURI+`/user/stock/update/${id}`,
      formData
    );
  }

  addPOS(formData: FormData): Observable<ApiResponse<{ stocks: any }>>{
    return this.http.post<ApiResponse<{stocks: any}>>(
      environment.backendURI+`/user/sales`,
      formData
    );
  }
}
