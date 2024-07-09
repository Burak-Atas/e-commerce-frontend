import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product';

@Component({
  selector: 'category-list',
  templateUrl: './cart.component.html',
  // providers: [CartService] // Artık gerekli değil, çünkü providedIn: 'root' kullanılıyor.
})
export class CartComponent implements OnInit {

  products: Product[] = [];
  total:number;
  selectedCategory: Category | null = null;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.gettocart().subscribe(data => {
      this.products = data.usercart;
      this.total = data.total;
      console.log(this.products);
    });
  }

  removeFromCart(item: Product): void {
    
  }
}
