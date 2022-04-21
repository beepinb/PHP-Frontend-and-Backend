import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  #isLoggedIn:boolean=false;
  get isLoggedIn() {return this.#isLoggedIn;}
  set isLoggedIn(isLoggedIn) {this.#isLoggedIn=isLoggedIn;}

  constructor() { }

  
}
