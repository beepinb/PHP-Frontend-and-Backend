import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Credentials } from '../login/login.component';
import { SeriesDataService } from '../series-data.service';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
})
export class RegisterUserComponent implements OnInit {
  errorMessage:string="";
  hasError:boolean=false;
  successMessage:string="";
  hasSuccess:boolean=false;
  #registrationForm!:FormGroup;
  get registrationForm(){return this.#registrationForm;}

  constructor(private _userService:UserDataService, private router: Router,private _formBuilder:FormBuilder) {}

  ngOnInit(): void {
    this.#registrationForm=this._formBuilder.group({
      fullname:"",
      username:"",
      password:"",
      repassword:""
    })
  }

  registerUser(form: FormGroup): void {
    console.log(this.registrationForm.value);
    let newUser:Credentials=new Credentials(); 
    if(newUser.fillFromForm(this.registrationForm)){

      this._userService.addUser(newUser).subscribe({
        next: (user) => {
          console.log('User Added', user);
          this.successMessage="User Created";
          this.hasSuccess=true;
          this.clearForm();
        },
        error: (err) => {
          console.log('Error', err);
          this.errorMessage="Registration error";
          this.hasError=true;
        },
        complete: () => {
          console.log('Complete');
          // alert('User created Successfully');
          // this.router.navigate(['series']);
        },
      });
    }else{
      console.log("password not matched");
      this.errorMessage="Password must match";
      this.hasError=true;
      this.hasSuccess=false;
    }
  }
  clearForm():void{
    this.#registrationForm.reset();
  }
}
