import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CategoriesDto, CategoriesVm,  CategoryClient, CreateCategoryCommand, FileResponse, UpdateCategoryCommand} from '../web-api-client';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private categoryClient: CategoryClient) { }

  setCategoryToAdd(cat: any = {}): CategoriesDto{
  let category = CategoriesDto.fromJS({
    id: 0,
    name: cat.name,            
    description: cat.description,
    img: cat.img,
  })
  return category;
 }

  getCategories():Observable<CategoriesVm> {    
    return this.categoryClient.get();
  }  
  
  addCategory(catName: string): Observable<number> {
    return this.categoryClient.create(<CreateCategoryCommand>{ name: catName});
  }

  deleteCategory(id: number): Observable<number> {
    return this.categoryClient.delete(id);
  }

  updateCategory(id, categoryToUpdate: any): Observable<FileResponse>{
    return this.categoryClient.update(id, UpdateCategoryCommand.fromJS(categoryToUpdate))  
  }
}
