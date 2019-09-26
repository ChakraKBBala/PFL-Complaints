import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstant } from '../App_Constant';

@Injectable({
  providedIn: 'root'
})
export class LandingService {
  ApiUrl: string
  login: string
  constructor(private http: HttpClient) {
    this.ApiUrl = AppConstant.API_ENDPOINT
    this.login = this.ApiUrl + AppConstant.API_URL.LOGIN
  }

  Login(obj: any) {
    return this.http.post(this.login, obj)
  }
}
