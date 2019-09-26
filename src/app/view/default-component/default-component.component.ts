import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-default-component',
  templateUrl: './default-component.component.html',
  styleUrls: ['./default-component.component.scss']
})
export class DefaultComponent implements OnInit {
  breadcrumps: any
  display: boolean = false;
  UserName: any
  constructor(private router: Router) { }

  ngOnInit() {
    this.UserName = localStorage.getItem("USER")
    var self = this
    $('.sidemenu ul li').click(function () {
      self.display = false
    });
  }

  logout() {
    this.router.navigate(['/'])
  }

}
