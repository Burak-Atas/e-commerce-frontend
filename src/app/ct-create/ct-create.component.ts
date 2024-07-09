import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ct-create',
  templateUrl: './ct-create.component.html',
  styleUrls: ['./ct-create.component.css'],
  providers: [CategoryService]
})
export class CtCreateComponent implements OnInit  {

  imageUrl: string = '';

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  saveCategory(name: any) {
    if (!name.value) {
      console.error("Category name is required");
      return;
    }

    this.categoryService.createCategory({ id: "", name: name.value, imageUrl: this.imageUrl }).subscribe({
      next: data => {
        this.router.navigate(["/products"]);
      },
      error: err => {
        console.error("Error creating category:", err);
      }
    });
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.categoryService.saveCategoryImage(file).subscribe({
        next: data => {
          this.imageUrl = data.url;
          console.log("Image URL:", this.imageUrl);
        },
        error: err => {
          console.error("Error uploading image:", err);
        }
      });
    } else {
      console.error("No file selected");
    }
  }

  deletecategroy(){
    this.categoryService.deleteCategroy("665f271a7d7228c6b8abc49c").subscribe(data=>{
      console.log(data)
    })
  }
}