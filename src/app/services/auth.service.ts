import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, last, Subject, tap, throwError } from 'rxjs';
import { AuthResponse } from '../models/auth-response';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "http://localhost:8000";

  api_key="AIzaSyABbajbu-ZJVrChzFShsYpxf7B7SHRFQ24"
  user = new BehaviorSubject<User|null>(null);

  constructor(private http: HttpClient) { }

  register(email: string,first_name: string,last_name: string, password: string) {

      return this.http.post<AuthResponse>(`${this.url}/users/signup` , {
        email: email,
        password: password,
        first_name: first_name,
        last_name: last_name,

      }).pipe(
        tap(response => {
          console.log(response)
        }),
        catchError(this.handleError)
      );
  }

  logout() {
    localStorage.removeItem("user");
    window.location.reload();

  }

  login(email:string, password: string) {
    return this.http.post<AuthResponse>(`${this.url}/users/login` , {
        email: email,
        password: password,
    }).pipe(
      tap(response => {
        console.log("data ")
        this.handleUser(response.email,response.fisrt_name,response.last_name,response.token)
      }),
      catchError(this.handleError)
    );
  }

  
  isLoggedIn(): boolean {
    return this.user.value !== null;
  }

  // Add this method to redirect to login page
  loginPage(): void {
    window.location.href = '/auth';
  }
  autoLogin() {
    if(localStorage.getItem("user") == null) {
      return;
    }

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const loadedUser = new User(user.email, user.first_name,user.last_name,user.token);

    if(loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  private handleError(err: HttpErrorResponse) {
    let message = "hata oluştu";

    if(err.error.error) {
      switch(err.error.error.message) {
        case "EMAIL_EXISTS":
          message = "bu mail adresi zaten kullanılıyor."
          break;
        case "TOO_MANY_ATTEMPTS_TRY_LATER":
          message = "bir süre bekleyip tekrar deneyiniz."
          break;
        case "EMAIL_NOT_FOUND":
          message = "email adresi bulunamadı";
          break;
        case "INVALID_PASSWORD":
          message ="hatalı parola";
          break;
      }
    }

    return throwError(() => message);
  }


  private handleUser(email: string, first_name: string, last_name: string, _token: string) {
    
        
    const user = new User(
      email,
      first_name,
      last_name,
      _token
    );

    this.user.next(user);

    localStorage.setItem("user", JSON.stringify(user));
  }
}
