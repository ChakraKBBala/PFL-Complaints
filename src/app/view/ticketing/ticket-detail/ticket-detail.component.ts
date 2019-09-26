import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash'
import { TicketListComponent } from '../ticket-list/ticket-list.component';
import { MessageService } from 'primeng/api';
import { TicketService } from '../ticket.service';
@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss']
})
export class TicketDetailComponent implements OnInit {
  @ViewChild(TicketListComponent, { static: false }) list: TicketListComponent
  breadcrumps: any
  home: any;
  Comments: any;
  ticketdetails: any;
  post: any = {};
  ticektId: any;
  userdetails: any
  ticketcomments: any;
  showLoader: boolean = false;
  constructor(
    private acroute: ActivatedRoute,
    private messageservice: MessageService,
    private ticketservice: TicketService,
    private router: Router
  ) {
    this.userdetails = this.acroute.snapshot.queryParamMap.get('uId');
    this.acroute.params.subscribe(params => {
      if (!_.isEmpty(params)) {
        this.ticektId = params.id;
        console.log("urlparams", this.ticektId);
      }
    });
  }

  ngOnInit() {
    this.checkUser()
    this.breadcrumps = [
      { label: 'Ticket List', routerLink: ['/PFL/Tickets/TicketList'] },
      { label: 'Ticket Details' },
    ];
    this.home = { icon: 'pi pi-home' };
    this.getTicketDetails()
  }

  checkUser() {
    if (this.userdetails) {
      console.log("user", this.userdetails)
      this.ticketservice.CheckTicket_User(this.ticektId, this.userdetails).subscribe((res: any) => {
        if (res.status == "success") {
          localStorage.setItem("AUTH", "true")
          localStorage.setItem("USER", this.userdetails)
          this.ticketdetails = res.Ticket[0]
          this.Comments = res.Replys
        } else {
          localStorage.clear()
          this.router.navigate(['/'])
          this.messageservice.add({ severity: 'error', summary: 'Sorry !', detail: "User Not Found" });
        }
      })
    }
  }

  getTicketDetails() {
    if (!this.userdetails) {
      this.showLoader = true;
      this.ticketservice.GetTicketDetailsByID(this.ticektId).subscribe((res: any) => {
        this.showLoader = false;
        if (res.status == "success") {
          this.ticketdetails = res.Ticket[0]
          this.Comments = res.Replys
        }
      })
    }
  }

  submitPost() {
    var validata: boolean = true;
    var validataionMsg: any = [];
    var user = localStorage.getItem("USER")
    if (!this.post.replytype) {
      validata = false;
      validataionMsg.push("Please select Reply Type")
    } else if (!this.post.message) {
      validata = false;
      validataionMsg.push("Please Enter Message")
    }
    if (validata) {
      var obj = {
        "ReplyFrom": user,
        "TicketId": this.ticketdetails.TicketId,
        "TicketNo": this.ticketdetails.TicketNo,
        "ReplyType": this.post.replytype,
        "ReplyMessage": this.post.message,
      }
      this.showLoader = true;
      this.ticketservice.Post_Comment(obj).subscribe((res: any) => {
        this.showLoader = false;
        if (res.status == "success") {
          this.messageservice.add({ severity: 'success', summary: 'Success', detail: "Posted Successfully" });
          if (!this.userdetails) { this.getTicketDetails() } else { this.checkUser(); }
          this.resetform()

        } else {
          this.messageservice.add({ severity: 'error', summary: 'Sorry !', detail: res.message });
        }
      })
    } else {
      this.messageservice.add({ severity: 'warn', summary: 'Warning', detail: validataionMsg[0] });
    }
  }

  resetform(){
    this.post = {}
  }

}
