import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TicketService } from '../ticket.service';
import { MessageService } from 'primeng/api';
import { CommonService } from 'src/app/Common_service/common.service';
import { Router } from '@angular/router';
import * as _ from 'lodash'
@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  ticket: any = {}
  TicketList: any[]
  cols: any[]
  breadcrumps: any;
  home: any;
  selectedList: any;
  showLoader: boolean = false;
  constructor(
    private fb: FormBuilder,
    private ticketservice: TicketService,
    private messageservice: MessageService,
    private commonservice: CommonService,
    private router: Router) {
  }

  ngOnInit() {
    let date = new Date();
    this.ticket.dtefrom = new Date(date.getFullYear(), date.getMonth(), 1)
    this.ticket.dteto = new Date();
    this.GetTickets();
    this.breadcrumps = [
      { label: 'Ticket List' },
    ];
    this.home = { icon: 'pi pi-home' };
    this.cols = [
      { field: 'sno', header: 'S.No' },
      { field: 'TicketNo', header: 'TicketNo' },
      { field: 'TicketDate', header: 'TicketDate' },
      { field: 'TicketFrom', header: 'TicketFrom' },
      { field: 'TicketTo', header: 'TicketTo' },
      { field: 'PONumber', header: 'PONumber' },
      { field: 'Message', header: 'Message' },
      { field: 'TicketStatus', header: 'TicketStatus' }
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
        dteto: this.alterdateformat(this.ticket.dteto)
      }
      this.showLoader = true;
      this.ticketservice.GetTickets(obj).subscribe((res: any) => {
        this.showLoader = false;
        if (res.status == "success") {
          this.TicketList = res.Tickets
          _.map(this.TicketList, (val, index) => {
            val.sno = index + 1
          })
        } else {
          this.TicketList = res.Tickets
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

  ticketdetails(data: any) {
    if (data) {
      // localStorage.setItem("ticketDetail", JSON.stringify(data))
      this.router.navigate(['/PFL/Tickets/TicketDetails', data.TicketId])
      // var details = JSON.stringify(data)
      // this.selectedList = btoa(details)
      // this.router.navigate(['/PFL/Tickets/TicketDetails'], { queryParams: { "page": this.selectedList } })
    }
  }

  cancel() {
    this.messageservice.add({ severity: 'warn', summary: 'Warning', detail: "Message" });
  }

}
