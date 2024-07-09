import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pd-create',
  templateUrl: './pd-create.component.html',
  styleUrls: ['./pd-create.component.css'],
  providers: [CategoryService]
})
export class PdCreateComponent implements OnInit  {

  categories: Category[] = [];
  error: string = "";
  model: any = {

    categoryId: ""
  };

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  saveProduct(form: NgForm) {

    const extensions = ["jpeg","jpg","png","webp"];
    const extension = this.model.imageUrl.split(".").pop();

    if(extensions.indexOf(extension) == -1) {
      this.error ="resim uzantısı sadece jpeg, jpg, png olmalıdır.";
      return;
    }

    if(this.model.categoryId == "0") {
      this.error ="kategori seçmelisiniz.";
      return;
    }

    const product = { 
      id: "", 
      name: this.model.name, 
      price: this.model.price, 
      imageUrl: this.model.imageUrl, 
      description: this.model.description, 
      isActive: this.model.isActive, 
      categoryId: this.model.categoryId
    }

    if(form.valid) {
      this.productService.createProduct(product).subscribe(data => {
        this.router.navigate(['/products']);
      });
    } else {
      this.error ="formu kontrol ediniz.";
    }

    console.log(this.model);
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    this.productService.saveImage(file).subscribe(data => {
      this.model.imageUrl = data.url; // data.url, HTTP isteğinin sonucunda dönen veri içindeki URL'yi temsil ediyor
      console.log(data.url)
    });
  }
  
  

 
}