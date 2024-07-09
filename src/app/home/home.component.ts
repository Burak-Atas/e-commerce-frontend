import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductRepository } from '../models/product.repository';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { MailserviceService } from '../mailservice.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[ProductService,MailserviceService]
})
export class HomeComponent implements OnInit {
  loading: boolean = false;
  products:Product[];
  constructor(private http:HttpClient,private productService:ProductService, private route: ActivatedRoute,private mailService:MailserviceService){
  }



  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loading = true;

      this.productService.getProducts(params["categoryId"]).subscribe(data => {
        this.products = data.slice(0, 4); // İlk 4 ürünü alır
        this.loading = false;
      });

    });
  }

  sendMail(email:string){
    this.mailService.sendMail(email).subscribe(data=>{
      window.location.reload()
    })
  }

}
