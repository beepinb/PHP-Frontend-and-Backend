import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // #isLoggedIn:boolean=false;
  #isLoggedIn:boolean=this.token!=null;
  get isLoggedIn() {return this.#isLoggedIn;}
  set isLoggedIn(isLoggedIn) {this.#isLoggedIn=isLoggedIn;}

  set token(token){
    localStorage.setItem(environment.TOKEN_STORAGE_KEY,token);
    this.isLoggedIn=true;
  }

  get token() {return localStorage.getItem(environment.TOKEN_STORAGE_KEY) as string;};

  get name(){
    let name:string="Unknown";
    if(this.token){
      name=this._jwtService.decodeToken(this.token).fullname as string;
    }
    return name;
  }

  constructor(private _jwtService:JwtHelperService) { }

  deleteToken(){
    localStorage.clear();
    this.isLoggedIn=false;
  }

  getName(){
    const token:string=localStorage.getItem(environment.TOKEN_STORAGE_KEY) as string;
    if(token){
      name
    }
  }

  
}
