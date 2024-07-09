import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResponse } from '../models/user-response';
import { MySparis } from '../models/sparis';

@Injectable()
export class MySparisService {
  private url = "http://localhost:8000";
  token:string;
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


  getSparis(): Observable<UserCart> {
    const headers = new HttpHeaders({
      'token': this.token
    });

    return this.http.get<UserCart>(`${this.url}/getsparis`, { headers });
  }
  
}
interface UserCart {
  // Burada UserCart arayüzünün yapısını tanımlayın
  // Örnek olarak:
  sparis: any[];
  totalPrice: number;
}