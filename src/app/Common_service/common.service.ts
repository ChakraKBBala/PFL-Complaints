import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  getFormErrorMessage(formGroupObj: FormGroup, errorObj: any) {
    for (let i in formGroupObj.controls) {
      var formControlObj = formGroupObj.controls[i];
      if (formControlObj instanceof FormControl) {
        if (formControlObj.errors) {
          return errorObj[i][Object.keys(formControlObj.errors)[0]];
        }
      }
    }
  }

  checkvalid(from: any, to: any) {
    var fromdate = new Date(from);
    var todate = new Date(to)
    fromdate.setHours(0, 0, 0, 0);
    todate.setHours(0, 0, 0, 0);
    if (!(fromdate <= todate)) {
      return false
    }
    else {
      return true
    }
  }
}
