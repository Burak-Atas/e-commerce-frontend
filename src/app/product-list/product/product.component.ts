import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { Product } from 'src/app/models/product';
import { NavbarComponent } from 'src/app/navbar/navbar.component';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers:[ProductService,AuthService,CategoryService]
})
export class ProductComponent implements OnInit {
  categoryName:string 
  categoryId:any
  product: Product | undefined;
  loading: boolean = false;
  products:Product[]= []
  isAuthenticated: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private authService: AuthService,
    private cartService: CartService,
    private notificationService: NotificationService,
    private categoryService :CategoryService,

    private router: Router
  ) {
    let user = localStorage.getItem("user");
    console.log("navbar user",user)
    if (user !== "" && user !== null) {
        this.isAuthenticated = true;
        console.log("register or login");
    } else {
        this.isAuthenticated = false;
    }
  }
  checkLoginStatus() {
    if (this.authService.isLoggedIn()) {
      console.log("oturum aktif");
    } else {
      this.authService.loginPage();
    }
  }
  deletePro(){
    this.productService.deleteProduct(this.product?.id)
    this.router.navigate(['/products']);
  }
  addtocart(id:string){

    this.cartService.addtocart(id).subscribe(result=>{
      console.log(result)
      this.notificationService.showNotification('Sepete eklendi');
    })
  } 
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params["productId"];
      this.loading = true;
      
      this.productService.getProductById(id).subscribe(result => {
        this.product = { ...result, id: id };
        this.loading = false;
        this.categoryService.getCategoryByid(this.product?.categoryId).subscribe(data=>{
          this.categoryName= data.name
          this.categoryId=data.id
          
        })
        
        if (this.product?.categoryId) {
          this.productService.getProducts(this.product.categoryId).subscribe(data => {
            this.products = data.slice(0, 4);
            console.log(data)
            
          });
        }
      });
    });

  
  }
  
  

}
