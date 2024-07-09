import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class MailserviceService {
  private url = "http://localhost:8000";
  constructor(private http: HttpClient) { }

  sendMail(email: string): Observable<string> {
    return this.http.get<string>(this.url + "/sendmail?email="+email);
  }
}
