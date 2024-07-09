import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResponse } from '../models/user-response';

@Injectable()
export class IscontoService {
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
   
  getIsconto(iscontoName: string): Observable<{ isconto: number }> {
    const headers = new HttpHeaders({
      'token': `${this.token}`
    });
  
    return this.http.post<{ isconto: number }>(`${this.url}/isconto`, { "name":iscontoName }, { headers });
  }
  


  
  
}
