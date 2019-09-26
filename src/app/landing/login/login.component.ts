import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LandingService } from '../landing.service';
import { CommonService } from 'src/app/Common_service/common.service';
import { MessageService } from 'primeng/api';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  LoginForm: FormGroup;
  showLoader: boolean = false;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private landingservice: LandingService,
    private commonservice: CommonService,
    private messageservice: MessageService) {
    document.body.className = "bg"
    this.LoginForm = this.fb.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }


  ngOnInit() {

  }

  ngOnDestroy() {
    $("body").removeClass("bg");
  }

  formObj: any = {
    Username: {
      required: "user Name Required",
    },
    Password: {
      required: "password Required"
    },
  }

  Login() {
    if (this.LoginForm.status == "INVALID") {
      var errorMessage = this.commonservice.getFormErrorMessage(this.LoginForm, this.formObj);
      this.messageservice.add({ severity: 'warn', summary: 'Warning', detail: errorMessage });
      return false;
    }
    this.showLoader = true;
    this.landingservice.Login(this.LoginForm.value).subscribe((res: any) => {
      if (res.status == "success") {
        console.log("data", res)
        localStorage.setItem("AUTH", "true")
        localStorage.setItem("USER", this.LoginForm.value.Username)
        this.router.navigate(["/PFL/Tickets/TicketList"]);
        this.showLoader = false;
      } else {
        this.showLoader = false;
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: "invalid Credential" });
      }
    })
  }

}
