import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResponse } from '../models/user-response';

@Injectable()
export class UserService {
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


   
  getUser(): Observable<{ user: UserResponse }> {
    const headers = new HttpHeaders({
      'token': `${this.token}`
    });
  
    return this.http.get<{ user: UserResponse }>(`${this.url}/getuser`, { headers });
  }
  

  editUser(user: UserResponse) {
    const headers = new HttpHeaders({
      'token': `${this.token}`
    });

    return this.http.post(`${this.url}/updateuser`, user, { headers });
  }

  
  
}
