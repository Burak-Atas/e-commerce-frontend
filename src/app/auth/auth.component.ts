import { ConditionalExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/auth-response';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode: boolean = true;
  loading: boolean = false;
  error: string = "";

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  toogleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  handleAuth(form: NgForm) {
    if(!form.valid) {
      return;
    }

    this.loading = true;
    
    const email = form.value.email;
    const password = form.value.password;
    const first_name = form.value.first_name;
    const last_name = form.value.last_name;

    let authResponse: Observable<AuthResponse>;

    if(this.isLoginMode) {     
      authResponse = this.authService.login(email, password);
    } else {
      authResponse = this.authService.register(email,first_name,last_name ,password);
    }

    authResponse.subscribe({
      next: () => {
        this.loading = false;
        this.error = "";
        window.location.href="/";
      },
      error: (err) => {
        this.loading = false;
        this.error = err;
      }
    });

  }


}
