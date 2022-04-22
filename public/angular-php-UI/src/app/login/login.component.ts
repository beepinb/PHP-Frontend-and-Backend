import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { UserDataService } from '../user-data.service';

export class LoginToken {
  success: boolean = false;
  token: string = '';
}

export class Credentials {
  fullname!: string;
  username!: string;
  password!: string;

  public fillFromForm(form: FormGroup | NgForm): boolean {
    this.fullname = form.value.fullname;
    this.username = form.value.username;
    this.password = form.value.password;
    return form.value.password === form.value.repassword;
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  get isLoggedIn() {
    return this._authService.isLoggedIn;
  }

  get name() {
    return this._authService.name;
  }
  @ViewChild('loginForm')
  loginForm!: NgForm;

  credentials!: Credentials;
  constructor(
    private _userService: UserDataService,
    private _authService: AuthenticationService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.credentials = new Credentials();
    this.credentials.username = '';
    this.credentials.password = '';
    setTimeout(() => {
      this.loginForm.setValue(this.credentials);
    }, 0);
    // this._authService.isLoggedIn
  }

  onSubmit(form: NgForm): void {
    console.log('Form Submitted');
    console.log(form.value);
    let user: Credentials = new Credentials();
    user.fillFromForm(form);
    this._userService.login(user).subscribe({
      next: (loginToken) => this.login(loginToken),
      error: (err) => {
        console.log('Login error', err);
      },
    });
  }

  login(loginToken: LoginToken): void {
    console.log('Login Called', loginToken);
    this._authService.token = loginToken.token;
    this._router.navigate(['/']);
  }
  logout() {
    localStorage.clear();
    this._authService.deleteToken();
  }
}
