import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { UserDataService } from '../user-data.service';



export class LoginToken{
  success:boolean=false;
  token:string="";
}

export class Credentials{
  fullname!:string;
  username!:string;
  password!:string;

  public fillFromForm(form:FormGroup|NgForm|any):boolean{
    this.fullname=form.value.fullname;
    this.username=form.value.username;
    this.password=form.value.password;
    return form.value.password===form.value;
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  get isLoggedIn(){return this._authService.isLoggedIn;}

  get name(){
    // return this._authService.name;
    return
  }
  @ViewChild('loginForm')
  loginForm!:NgForm;

  credentials!:Credentials;
  constructor(private _userService:UserDataService,private _authService:AuthenticationService) { }

  ngOnInit(): void {
    this.credentials=new Credentials();
    this.credentials.username="";
    this.credentials.password="";
    
    setTimeout(() => {this.loginForm.setValue(this.credentials);}, 0);
  }



  onSubmit(form:NgForm):void{
    console.log("Form Submitted");
    console.log(form.value);
    let user:Credentials=new Credentials();
    user.fillFromForm(form);
    
    

  }


}
