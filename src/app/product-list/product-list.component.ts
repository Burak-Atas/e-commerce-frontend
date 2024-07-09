
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService,CategoryService]
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  loading: boolean = false;
  page: number = 1; // Sayfa numarasını tanımlayın
  itemsPerPage: number = 6; // Her sayfada kaç ürün görüneceğini tanımlayın

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService:CategoryService
  ) { }
  categories: any = {};

  getCateogry(id: any) {
    return this.categories[id]?.name || '';
  }
  
  loadCategories() {
    this.categoryService.getCategories().subscribe(data => {
      data.forEach(category => {
        this.categories[category.id] = category;
      });
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loading = true;

      this.productService.getProducts(params["categoryId"]).subscribe(data => {
        this.products = data;
        this.loading = false;
        console.log("ürünler:", this.products);
      });

    });

    this.loadCategories();

  }
 

}
