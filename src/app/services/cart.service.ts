import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../models/product";
import { tap, delay, catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { AuthService } from "./auth.service";
import { User } from "../models/user";
import { BehaviorSubject } from 'rxjs';
// local service
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private url = "http://localhost:8000/";
  private token:string;
  private cartUpdated = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    const userString = localStorage.getItem("user");
    console.log(userString)
    if (userString) {
      const user = JSON.parse(userString);
      console.log("deneme",user)

      const token = user._token;
      this.token = token;
    }
  }

  addtocart(id: string): Observable<Product[]> {
    const headers = new HttpHeaders({
      'token': `${this.token}`

    });
    return this.http
    .get<Product[]>(`${this.url}addtocart?id=${id}`, { headers })
      .pipe(
        tap(data => 
          this.cartUpdated.next(true)
        ),
        delay(200),
        catchError(error => {
          console.error('Error adding to cart', error);
          return throwError(error);
        })
      );
  }
  getCartUpdatedListener() {
    return this.cartUpdated.asObservable();
  }
  gettocart(): Observable<{ total: number, usercart: Product[] }> {
    const headers = new HttpHeaders({
      'token': `${this.token}`

    });
    return this.http
      .get<{ total: number, usercart: Product[] }>(`${this.url}listcart`, { headers })
      .pipe(
        tap(data => console.log(data)),
        delay(1000),
        catchError(error => {
          console.error('Error getting cart', error);
          return throwError(error);
        })
      );
  }
  buytocart(): Observable<{ total: number, usercart: Product[] }> {
    const headers = new HttpHeaders({
      'token': `${this.token}`

    });
    return this.http
      .get<{ total: number, usercart: Product[] }>(`${this.url}cartcheckout`, { headers })
      .pipe(
        tap(data => console.log(data)),
        delay(1000),
        catchError(error => {
          console.error('Error getting cart', error);
          return throwError(error);
        })
      );
  }

  removetocart(id:string){
    const headers = new HttpHeaders({
      'token': `${this.token}`

    });
    return this.http
      .get<{ total: number, usercart: Product[] }>(`${this.url}removeitem?id=${id}`, { headers })
      .pipe(
        tap(data =>  this.cartUpdated.next(true)),
        delay(1000),
        catchError(error => {
          console.error('Error getting cart', error);
          return throwError(error);
        })
      );
  }
  removetocartone(id:string){
    const headers = new HttpHeaders({
      'token': `${this.token}`

    });
    return this.http
      .get<{ total: number, usercart: Product[] }>(`${this.url}removeitemone?id=${id}`, { headers })
      .pipe(
        tap(data =>  this.cartUpdated.next(true)),
        delay(1000),
        catchError(error => {
          console.error('Error getting cart', error);
          return throwError(error);
        })
      );
  }
  
}
