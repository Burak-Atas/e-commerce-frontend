import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, tap, delay, take, exhaustMap } from "rxjs";
import { Product } from "../models/product";
import { AuthService } from "./auth.service";

// local service
@Injectable()
export class ProductService {
    private url = "http://localhost:8000/";

    constructor(
        private http: HttpClient, 
        private authService: AuthService
    ) {}

    getProducts(categoryId: number): Observable<Product[]> {
        return this.http
            .get<Product[]>(this.url + "users/productview")
            .pipe(
                map(data => {
                    const products: Product[] = [];

                    for(const key in data) {
                        if(categoryId) {
                            if(categoryId == data[key].categoryId) {
                                products.push(data[key]);
                            }
                        }
                        else {
                            products.push(data[key]);
                        }
                    }

                    return products;
                }),
                tap(data => console.log(data)),
                delay(1000)
            );
    }

    getProductById(id: string): Observable<Product> {
        return this.http.get<Product>(this.url + "users/search?name=" + id).pipe(delay(1000));
    }

    createProduct(product: Product): Observable<Product> {
        return this.authService.user.pipe(
            take(1),
            tap(user => console.log(user)),
            exhaustMap(user => {
                return this.http.post<Product>(this.url + "admin/addproduct" , product);
            })
        );
    }

    deleteProduct(id:any):Observable<Product>{
        return this.http.get<Product>(this.url+"/admin/product/delete"+id)
    }
    
  saveImage(image: File) {
    const formData = new FormData();
    formData.append('image', image);

    return this.http.post<any>(this.url+'admin/saveimage', formData)
  }

}