import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Product } from '../models/product';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  products: Product[] = [];
  counter: number;
  total: number;
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;

  constructor(private authService: AuthService, private cartService: CartService) { }

  ngOnInit(): void {
    let user = localStorage.getItem("user");
    console.log("navbar user",user)
    if (user !== "" && user !== null) {
        this.isAuthenticated = true;
        console.log("register or login");
    } else {
        this.isAuthenticated = false;
    }
    this.updateCart();

    this.cartService.getCartUpdatedListener().subscribe(() => {
        this.updateCart();
    });
}


  updateCart() {
    this.cartService.gettocart().subscribe(data => {
      this.products = data.usercart;
      this.total = data.total;
      this.counter = this.products.length;
      console.log(this.products);
      console.log(this.counter);
    });
  }

  logout() {
    this.authService.logout();
  }
}
