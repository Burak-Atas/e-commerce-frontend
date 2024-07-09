import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { Category } from '../models/category';
import { CartService } from '../services/cart.service';
import { Product2 } from '../models/basketProducts2';
import { Router } from '@angular/router';
import { IscontoService } from '../services/isConto.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
  providers:[IscontoService]
})
export class BasketComponent implements OnInit {
  counter: number;
  products: Product[] = [];
  products2: Product2[] = []; // Initialize products2 as an array
  total: number;
  selectedCategory: Category | null = null;

  constructor(private cartService: CartService,private iscontoService:IscontoService, private router: Router) { }

  ngOnInit(): void {
    this.updateCart();
    this.cartService.gettocart().subscribe(data => {
      this.products = data.usercart;
      this.total = data.total;

      // Ürünleri id'lerine göre grupla
      const productMap: { [id: string]: Product & { quantity: number } } = {};

      this.products.forEach(product => {
        if (productMap[product.id]) {
          productMap[product.id].quantity += 1; // Aynı id'li ürünler için sayacı artır
        } else {
          productMap[product.id] = { ...product, quantity: 1 }; // Yeni bir ürün ekle
        }
      });

      // Gruplanmış ürünleri bir diziye dönüştür
      const groupedProducts: (Product & { quantity: number })[] = Object.values(productMap);

      // products2'yi güncelle
      this.products2 = groupedProducts.map(groupedProduct => ({
        counter: groupedProduct.quantity,
        product: groupedProduct
      }));

      console.log("products2", this.products2);
    });
  }

  deleteCart(id: string) {
    this.cartService.removetocart(id).subscribe(data => {
      console.log(data);
      this.updateCart(); // Refresh cart after deletion
      window.location.reload()
    });
  }

  deleteOneCart(id: string) {
    this.cartService.removetocartone(id).subscribe(data => {
      console.log(data);
      this.updateCart(); // Refresh cart after deletion
      window.location.reload()
    });
  }

  addBasket(id: string) {
    this.cartService.addtocart(id).subscribe(data => {
      console.log(data);
      this.updateCart(); // Refresh cart after adding item
      window.location.reload()
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
  BuyCart() {
    this.cartService.buytocart().subscribe(data => {
   
      this.router.navigate(['/success']);
      
    });
  }

  isConto(name:string) {
    this.iscontoService.getIsconto(name).subscribe(data=>{
      this.total =this.total * (100-data.isconto)/100;
    })
  }
}
