import { Component, TemplateRef, OnInit } from '@angular/core';
import { CategoriesDto, CategoriesVm} from '../web-api-client';
import { faTrash, faPenSquare, faGrinTongueSquint } from '@fortawesome/free-solid-svg-icons';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NotificationService } from '../notification.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  vm: CategoriesVm;
  selectedCategories: CategoriesDto;

  newCategoryModalRef: BsModalRef;
  newCategoryEditor: any = {};
  categoryEditor: any = {};

  deleteCategoryModalRef: BsModalRef;
  updateCategoryModalRef: BsModalRef;

  categoryToDelete: CategoriesDto;
  categoryToUpdate: CategoriesDto;

  faTrash = faTrash;
  faPenSquare = faPenSquare;
  
  constructor(private modalService: BsModalService, private notifyService: NotificationService, private categoryService: CategoryService) { 
    categoryService.getCategories().subscribe(
      result => { 
        this.vm = result;
        if(this.vm.categories?.length) {
          this.selectedCategories = this.vm.categories[0];
        }
      },
      error => console.error(error)
    );    
  }
  showNewCategoryModal(template: TemplateRef<any>): void {
    this.newCategoryModalRef = this.modalService.show(template);
    setTimeout(() => document.getElementById("name").focus(), 250);
  }

  newCategoryCancelled(): void {
    this.newCategoryModalRef.hide();
    this.newCategoryEditor = {};
  }

  addCategory(): void {       
     let category = this.categoryService.setCategoryToAdd(this.newCategoryEditor);
    this.categoryService.addCategory(this.newCategoryEditor.name).subscribe(
      result => {
            category.id = result;
            this.vm.categories.push(category);
            this.selectedCategories = category;
            this.newCategoryModalRef.hide();
            this.newCategoryEditor = {};
            this.notifyService.showSuccess("Categoria Agregada Exitosamente.", "Categoria");
          },
          error => {
            let errors = JSON.parse(error.response);
            this.notifyService.showError("Se ha Producido un Error, no se Pudo Crear la Categoria.", "Categoria");
    
            if(errors && errors.Title) {
              this.newCategoryEditor.error = errors.Title[0];
            }
    
            setTimeout(() => document.getElementById("name").focus(), 250);
    
          }
    )
  }

  confirmDeleteCategory(template: TemplateRef<any>, categoryToDelete: CategoriesDto) {    
    this.categoryToDelete = categoryToDelete;
    this.deleteCategoryModalRef = this.modalService.show(template);
  }

  showCategoryEditorModal(template: TemplateRef<any>, categoryToUpdate: CategoriesDto) {
    //TODO: Check if we need both objects (categoryToUpdate, categoryEditor)
    this.categoryToUpdate = categoryToUpdate;
    this.categoryEditor = this.categoryToUpdate;
    this.updateCategoryModalRef = this.modalService.show(template);
  }

  deleteCategoryConfirmed(): void {    
    this.categoryService.deleteCategory(this.categoryToDelete.id).subscribe(
      () => {
        this.deleteCategoryModalRef.hide();
        this.vm.categories = this.vm.categories.filter(c => c.id != this.categoryToDelete.id)
        this.selectedCategories = this.vm.categories.length ? this.vm.categories[0] : null;
        this.notifyService.showSuccess("Categoria Eliminada Exitosamente", "Categorias");        
      }, //TODO: handle error instead of going to console
      error => {
        console.log(error);
        this.notifyService.showError("Se ha Producido un error, no se Pudo Eliminar la Categoria.", "Categoria");
      }
    )
  }

   updateCategory(){
    this.categoryService.updateCategory(this.categoryToUpdate.id, this.categoryEditor)     
      .subscribe(
          () => {
            this.categoryToUpdate.name = this.categoryEditor.name,
            this.categoryToUpdate.description = this.categoryEditor.description,
            this.categoryToUpdate.img = this.categoryEditor.img,
            this.updateCategoryModalRef.hide();
            this.categoryEditor = {};
            this.notifyService.showSuccess("Categoria Modificada Exitosamente", "Categorias");        
          }, //TODO: handle error instead of going to console
          error => {
            console.error(error);
            this.notifyService.showError("Se ha Producido un error, no se Pudo Modificar la Categoria.", "Categoria")
          }
      );
   }
  ngOnInit(): void {
    
  }

}
