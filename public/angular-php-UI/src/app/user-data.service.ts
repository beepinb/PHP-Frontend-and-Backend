import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Credentials, LoginToken } from './login/login.component';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http:HttpClient) { }



  public addUser(userData:Credentials):Observable<Credentials>{
    const url:string=environment.REST_API_BASE+environment.REST_API_REGISTER_UESR;
    return this.http.post<Credentials>(url,userData);
  }
  public login(userData:any):Observable<LoginToken>{
    console.log("Hello");
    const url:string=environment.REST_API_BASE+environment.REST_API_REGISTER_UESR+environment.REST_API_LOGIN_USER;
    return this.http.post<LoginToken>(url,userData);
  }
}
