import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ProductService } from './services/product.service';
import { CartService } from './services/cart.service';

@Component({
  selector: '#app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProductService,CartService]
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.autoLogin();
  }

}
