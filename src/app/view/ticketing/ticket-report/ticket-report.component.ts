import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TicketService } from '../ticket.service';
import { MessageService } from 'primeng/api';
import { CommonService } from 'src/app/Common_service/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-report',
  templateUrl: './ticket-report.component.html',
  styleUrls: ['./ticket-report.component.scss']
})
export class TicketReportComponent implements OnInit {
  ticket: any = {}
  TicketList: any[]
  cols: any[]
  breadcrumps: any;
  home: any;
  Hello: any
  selectedList: any;
  showLoader: boolean = false;
  constructor(
    private ticketservice: TicketService,
    private messageservice: MessageService,
    private commonservice: CommonService,
    private router: Router
  ) { }

  ngOnInit() {
    this.ticket.replytype = "All"
    this.ticket.status = "All"
    let date = new Date();
    this.ticket.dtefrom = new Date(date.getFullYear(), date.getMonth(), 1)
    this.ticket.dteto = new Date();
    this.GetTickets();
    this.breadcrumps = [
      { label: 'Ticket List' },
    ];
    this.home = { icon: 'pi pi-home' };
    this.cols = [
      { field: 'TicketNo', header: 'Ticket No' },
      { field: 'TicketDate', header: 'Ticket Date' },
      { field: 'TicketFrom', header: 'Ticket From' },
      { field: 'PONumber', header: 'PO Number' },
      { field: 'Message', header: 'Message' },
      { field: 'TicketStatus', header: 'Ticket Status' },
      { field: 'ReplyFrom', header: 'Reply From' },
      { field: 'ReplyMessage', header: 'Reply Message' }
    ];
  }

  GetTickets() {
    var validdata: Boolean = true;
    var validationerrorMsg = [];
    if (this.ticket.dtefrom || this.ticket.dteto) {
      if (!(this.ticket.dtefrom && this.ticket.dteto)) {
        validdata = false;
        validationerrorMsg.push("Please select both From & To Date");
      } else {
        var validdate = this.commonservice.checkvalid(this.ticket.dtefrom, this.ticket.dteto)
        if (!validdate) {
          validdata = false;
          validationerrorMsg.push("To date should be higher/equal to From date");
        }
      }
    } else validdata = false; validationerrorMsg.push("Please select From & To Date")
    if (validdata) {
      var obj = {
        dtefrom: this.alterdateformat(this.ticket.dtefrom),
        dteto: this.alterdateformat(this.ticket.dteto),
        replytype: this.ticket.replytype,
        status: this.ticket.status
      }
      console.log("obj", obj)
      this.showLoader = true;
      this.ticketservice.GetTicketsReport(obj).subscribe((res: any) => {
        this.showLoader = false;
        if (res.status == "success") {
          this.TicketList = res.TicketList
        } else {
          this.TicketList = res.TicketList
        }
      })
    } else {
      this.messageservice.add({ severity: 'warn', summary: 'Warning', detail: validationerrorMsg[0] })
    }

  }

  alterdateformat(date: any) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }


  clear() {
    this.ticket = {}
  }

}
