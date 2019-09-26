import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogoutGuard implements CanActivate {
  constructor(private router: Router) {

  }
  canActivate() {
    var auth = localStorage.getItem('AUTH')
    if (auth) {
      localStorage.clear();
      return true
    }
    else {
      return true
    }
  }

}
