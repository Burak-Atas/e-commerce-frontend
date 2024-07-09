import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap, delay, catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { Address } from "../models/address";

// local service
@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private url = "http://localhost:8000/";
  private token:string;

  constructor(private http: HttpClient) {
    const userString = localStorage.getItem("user");
    console.log(userString)
    if (userString) {
      const user = JSON.parse(userString);
      console.log(user)

      const token = user._token;
      this.token = token;
    }else{
      alert("tekrar giriş yapınız")
    }
  }

  addaddress(address: Address): Observable<Address[]> {
    const headers = new HttpHeaders({
      'token': `${this.token}`

    });
    return this.http
    .post<Address[]>(`${this.url}addaddress?id=665c67935577bde71d6fe173`,address, { headers })
      .pipe(
        tap(data => console.log(data)),
        delay(1000),
        catchError(error => {
          console.error('Error adding to cart', error);
          return throwError(error);
        })
      );
  }

  gettoaddress(): Observable<{ address: Address[] }> {
    const headers = new HttpHeaders({
      'token': `${this.token}`

    });
    return this.http
      .get<{ address: Address[] }>(`${this.url}getaddress?id=665c67935577bde71d6fe173`, { headers })
      .pipe(
        tap(data => console.log(data)),
        delay(1000),
        catchError(error => {
          console.error('Error getting cart', error);
          return throwError(error);
        })
      );
  }

  
  edittoaddress(address: Address): Observable<{ total: number, usercart: Address[] }> {
    const headers = new HttpHeaders({
      'token': `${this.token}`

    });
    return this.http
      .put<{ total: number, usercart: Address[] }>(`${this.url}edithomeaddress`,address, { headers })
      .pipe(
        tap(data => console.log(data)),
        delay(1000),
        catchError(error => {
          console.error('Error getting cart', error);
          return throwError(error);
        })
      );
  }

  removetoaddress(){
    const headers = new HttpHeaders({
      'token': `${this.token}`
    });
    return this.http
      .get<{ total: number, usercart: Address[] }>(`${this.url}deleteaddresses`, { headers })
      .pipe(
        tap(data => console.log(data)),
        delay(1000),
        catchError(error => {
          console.error('Error getting cart', error);
          return throwError(error);
        })
      );
  }
}
