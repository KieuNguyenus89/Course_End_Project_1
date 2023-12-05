import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }
  checkLoginInformation(login:any):boolean {
    if(login.emailid == "admin@email.com" && login.password == "pw123") {
      return true
    } else{
      return false
    }
  }
}
