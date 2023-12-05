import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  msg:string=""
  loginRef = new FormGroup({
    emailid: new FormControl(),
    password: new FormControl(),
  })

constructor(public loginService:LoginService, public router:Router) {}

checkLoginDetails():void {
  let login = this.loginRef.value
  if(this.loginService.checkLoginInformation(login)) {
    this.router.navigate(["home"], {skipLocationChange:true})
  }else{
    this.msg="Login failure, try once again"
  }
  this.loginRef.reset()
}

}
