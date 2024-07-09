import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';


@Component({
  selector: 'app-notification',
  template: `
    <div *ngIf="message" class="notification">
      {{ message }}
    </div>
  `,
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  message: string | null = null;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.notification$.subscribe(message => {
      this.message = message;
      setTimeout(() => {
        this.message = null;
      }, 3000);
    });
  }
}