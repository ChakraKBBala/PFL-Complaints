import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TicketService } from '../ticket.service';
import { MessageService } from 'primeng/api';
import { CommonService } from 'src/app/Common_service/common.service';
import { Router } from '@angular/router';
import * as _ from 'lodash'

@Component({
  selector: 'app-mail-master',
  templateUrl: './mail-master.component.html',
  styleUrls: ['./mail-master.component.scss']
})
export class MailMasterComponent implements OnInit {
  mail: any = {}
  MailList: any[]
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
    private router: Router
  ) {
    this.breadcrumps = [
      { label: 'Mail Master' },
    ];
    this.home = { icon: 'pi pi-home' };
    this.cols = [
      { field: 'sno', header: 'S.No' },
      { field: 'Name', header: 'Name' },
      { field: 'Description', header: 'Description' },
      { field: 'MailId', header: 'MailId' },
      { field: 'Host', header: 'Host' },
      { field: 'Port', header: 'Port' },
      { field: 'EnableSsl', header: 'EnableSsl' },
      { field: 'ReplyURL', header: 'ReplyURL' }
    ];
  }

  ngOnInit() {
    this.GetMailList();
  }

  GetMailList() {
    this.showLoader = true;
    this.ticketservice.GetMailList().subscribe((res: any) => {
      this.showLoader = false;
      if (res.status == "success") {
        this.MailList = res.Mailmaster
        _.map(this.MailList, (val, index) => {
          val.sno = index + 1
          if (val.EnableSsl == "false") {
            val.EnableSsl = false
          } else if (val.EnableSsl == "true") { val.EnableSsl = true }
        })
      } else {
        this.MailList = res.Mailmaster
      }
    })
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

  AddMail() {
    var validdata: Boolean = true;
    var validationerrorMsg = [];
    if (!this.mail.Name) {
      validdata = false;
      validationerrorMsg.push("Please enter Name")
    } else if (!this.mail.Description) {
      validdata = false;
      validationerrorMsg.push("Please enter Description")
    } else if (!this.mail.MailId) {
      validdata = false;
      validationerrorMsg.push("Please enter MailId")
    } else if (this.maineidt) {
      if (!this.mail.Password) {
        validdata = false;
        validationerrorMsg.push("Please enter Password")
      } else if (!this.mail.Host) {
        validdata = false;
        validationerrorMsg.push("Please enter Host")
      } else if (!this.mail.Port) {
        validdata = false;
        validationerrorMsg.push("Please enter Port")
      } else if (!this.mail.ReplyURL) {
        validdata = false;
        validationerrorMsg.push("Please enter ReplyURL")
      }
    }
    if (validdata) {
      if (!this.maineidt && !this.otheredit) {
        this.mail.Id = 0
      }
      this.mail.CreatedBy = localStorage.getItem("USER");
      console.log("mail", this.mail);
      this.ticketservice.CreateMail(this.mail).subscribe((res: any) => {
        if (res.status == "success") {
          if (!this.maineidt && !this.otheredit) {
            this.messageservice.add({ severity: 'success', summary: 'Success', detail: "Added Successfully" });
          } else {
            this.messageservice.add({ severity: 'success', summary: 'Success', detail: "Updated Successfully" });
          }
          this.clear()
          this.GetMailList();
        } else {
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: res.Message });
        }
      })
    } else {
      this.messageservice.add({ severity: 'warn', summary: 'Warning', detail: validationerrorMsg[0] });
    }
  }

  maineidt: boolean = false;
  otheredit: boolean = false;

  GetMail(data: any) {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    this.maineidt = true;
    this.mail.Id = data.Id;
    this.mail.Name = data.Name;
    this.mail.Description = data.Description;
    this.mail.MailId = data.MailId;
    this.mail.Password = data.Password;
    this.mail.Host = data.Host;
    this.mail.Port = data.Port;
    this.mail.ReplyURL = data.ReplyURL;
    this.mail.EnableSsl = data.EnableSsl;
  }
  GetOtherMail(data: any) {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    this.maineidt = false;
    this.mail = {};
    this.otheredit = true;
    this.mail.Id = data.Id;
    this.mail.Name = data.Name;
    this.mail.Description = data.Description;
    this.mail.MailId = data.MailId;
  }

  cancel() {
    this.messageservice.add({ severity: 'warn', summary: 'Warning', detail: "Message" });
  }

  clear() {
    this.maineidt = false;
    this.otheredit = false
    this.mail = {};
  }
}
