import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable()
export class CategoryService {

  private url = "http://localhost:8000";

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url + "/getcotegory")
              .pipe(
                map(data => {
                  const categories: Category[] = [];

                  for(const key in data) {
                    categories.push(data[key]);
                  }

                  return categories;
                })
              );
  }

  getCategoryByid(id:any):Observable<Category>{
    return this.http.get<Category>(this.url+"/users/getcategoryqueryid?id="+id);
  }
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.url + "/addcategory", category);
  }
  saveCategoryImage(image: File) {
    const formData = new FormData();
    formData.append('image', image);

    return this.http.post<any>(this.url+'/admin/category/saveimage', formData)
  }
  deleteCategroy(id:string){
    return this.http.get<any>(`${this.url}/admin/category/delete?id=${id}`, )
  }
}