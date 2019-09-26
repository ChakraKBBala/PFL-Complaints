import { Injectable } from '@angular/core';
import { AppConstant } from 'src/app/App_Constant';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TicketService {
  ApiUrl: string
  gettickets: string
  getticketdetails: string
  getmaillist: string
  getuserroles: string
  constructor(private http: HttpClient) {
    this.ApiUrl = AppConstant.API_ENDPOINT
    this.gettickets = this.ApiUrl + AppConstant.API_URL.TICKET.LIST
    this.getticketdetails = this.ApiUrl + AppConstant.API_URL.TICKET.LIST
    this.getmaillist = this.ApiUrl + AppConstant.API_URL.Mail.Mail
    this.getuserroles = this.ApiUrl + AppConstant.API_URL.USER.GET
  }

  GetTickets(obj: any) {
    let params: URLSearchParams = new URLSearchParams();
    params.set('dteFrom', obj.dtefrom);
    params.set('dteTo', obj.dteto);
    return this.http.get(this.gettickets + "?" + params)
  }

  GetTicketDetailsByID(obj: any) {
    let params: URLSearchParams = new URLSearchParams();
    params.set('intTicketId', obj);
    return this.http.get(this.gettickets + "?" + params)
  }

  GetTicketsReport(obj: any) {
    let params: URLSearchParams = new URLSearchParams();
    params.set('dteFrom', obj.dtefrom);
    params.set('dteTo', obj.dteto);
    params.set('strRplytype', obj.replytype);
    params.set('strStatus', obj.status);
    return this.http.get(this.gettickets + "?" + params)
  }

  CheckTicket_User(ticketId: any, User: any) {
    let params: URLSearchParams = new URLSearchParams();
    params.set('intTicketid', ticketId);
    params.set('strUser', User);
    return this.http.get(this.gettickets + "?" + params)
  }

  Post_Comment(obj: any) {
    return this.http.post(this.gettickets, obj)
  }

  GetUserRole() {
    return this.http.get(this.getuserroles)
  }

  CreateUser(obj: any) {
    return this.http.post(this.getuserroles, obj)
  }

  DeleteUser(obj: any) {
    let params: URLSearchParams = new URLSearchParams();
    params.set('userid', obj);
    return this.http.delete(this.getuserroles + "?" + params)
  }

  GetMailList() {
    return this.http.get(this.getmaillist)
  }

  CreateMail(obj:any) {
    return this.http.post(this.getmaillist,obj)
  }

}
