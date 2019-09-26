import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TicketService } from '../ticket.service';
import { MessageService } from 'primeng/api';
import { CommonService } from 'src/app/Common_service/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  register: any = {}
  UserList: any[]
  cols: any[]
  breadcrumps: any;
  home: any;
  selectedList: any;
  showLoader: boolean = false;
  RoleList: any;
  edit: boolean = false;
  constructor(
    private fb: FormBuilder,
    private ticketservice: TicketService,
    private messageservice: MessageService,
    private commonservice: CommonService,
    private router: Router) {
  }
  ngOnInit() {
    let date = new Date();
    this.GetUsers();
    this.breadcrumps = [
      { label: 'register' },
    ];
    this.home = { icon: 'pi pi-home' };
    this.cols = [
      { field: 'Email', header: 'Email' },
      { field: 'RoleName', header: 'RoleName' },
    ];
  }

  GetUsers() {
    var validdata: Boolean = true;
    var validationerrorMsg = [];
    if (validdata) {
      this.showLoader = true;
      this.ticketservice.GetUserRole().subscribe((res: any) => {
        this.showLoader = false;
        if (res.status == "success") {
          this.RoleList = res.Roles;
          this.UserList = res.Users
        }
      })
    } else {
      this.messageservice.add({ severity: 'warn', summary: 'Warning', detail: validationerrorMsg[0] })
    }
  }

  CreateUser() {
    var validdata: Boolean = true;
    var validationerrorMsg = [];
    if (!this.register.Email) {
      validdata = false;
      validationerrorMsg.push("Please enter email")
    } else if (!this.edit) {
      if (!this.register.Password) {
        validdata = false;
        validationerrorMsg.push("Please enter password")
      } else if (!this.register.cnfrmpassword || this.register.cnfrmpassword != this.register.Password) {
        validdata = false;
        validationerrorMsg.push("Password Mismatch")
      }
    } else if (!this.register.RoleId) {
      validdata = false;
      validationerrorMsg.push("Please select Role")
    }

    if (validdata) {
      this.register.CreatedBy = localStorage.getItem("USER")
      this.register.Username = this.register.Email
      if (!this.edit) { this.register.UserId = 0 }
      console.log("reg", this.register)
      this.showLoader = true;
      this.ticketservice.CreateUser(this.register).subscribe((res: any) => {
        this.showLoader = false;
        if (res.status == "success") {
          if (!this.edit) this.messageservice.add({ severity: 'success', summary: 'Success', detail: "User Created Successfully" })
          else this.messageservice.add({ severity: 'success', summary: 'Success', detail: "User Updated Successfully" })
          this.GetUsers();
          setTimeout(() => { this.clear() }, 100);
        } else {
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: res.message })
        }
      })
    } else {
      this.messageservice.add({ severity: 'warn', summary: 'Warning', detail: validationerrorMsg[0] })
    }
  }

  edituser(data: any) {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    this.edit = true
    this.register.Email = data.Email
    this.register.RoleId = data.RoleId
    this.register.UserId = data.UserId
    console.log("data", this.register)
  }
  selecteddata: any
  deleteuser(data: any) {
    this.selecteddata = data;
    this.messageservice.add({ key: 'c', sticky: true, severity: 'error', summary: 'Are you sure?', detail: 'Confirm to proceed' });
  }

  onConfirm() {
    this.messageservice.clear('c');
    this.ticketservice.DeleteUser(this.selecteddata.UserId).subscribe((res: any) => {
      if (res.status == "success") {
        this.messageservice.add({ severity: 'success', summary: 'Success', detail: "User Deleted Successfully" });
        this.GetUsers();
      } else {
        this.messageservice.add({ severity: 'success', summary: 'Success', detail: res.message })
      }
    })
  }

  onReject() {
    this.messageservice.clear('c');
  }


  clear() {
    this.register = {}
    this.register.RoleId = {}
    this.edit = false
  }

}
