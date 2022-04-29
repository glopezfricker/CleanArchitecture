import { Component, TemplateRef, OnInit } from '@angular/core';
import { CategoriesDto, CategoriesVm,  CategoryClient, CreateCategoryCommand, UpdateCategoryCommand} from '../web-api-client';
import { faTrash, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

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

  constructor(private categoryClient: CategoryClient, private modalService: BsModalService) { 
    categoryClient.get().subscribe(
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
    let category = CategoriesDto.fromJS({
      id: 0,
      name: this.newCategoryEditor.name,            
      description: this.newCategoryEditor.description,
      img: this.newCategoryEditor.img,
    });

    this.categoryClient.create(<CreateCategoryCommand>{ name: this.newCategoryEditor.name}).subscribe(
      result => {
        category.id = result;
        this.vm.categories.push(category);
        this.selectedCategories = category;
        this.newCategoryModalRef.hide();
        this.newCategoryEditor = {};
      },
      error => {
        let errors = JSON.parse(error.response);

        if(errors && errors.Title) {
          this.newCategoryEditor.error = errors.Title[0];
        }

        setTimeout(() => document.getElementById("name").focus(), 250);

      }
    );
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
    this.categoryClient.delete(this.categoryToDelete.id).subscribe(
      () => {
        this.deleteCategoryModalRef.hide();
        this.vm.categories = this.vm.categories.filter(c => c.id != this.categoryToDelete.id)
        this.selectedCategories = this.vm.categories.length ? this.vm.categories[0] : null;
      },
      error => console.log(error)
    )
  }

   updateCategory(){
     this.categoryClient.update(this.categoryToUpdate.id, UpdateCategoryCommand.fromJS(this.categoryEditor))
      .subscribe(
          () => {
            this.categoryToUpdate.name = this.categoryEditor.name,
            this.categoryToUpdate.description = this.categoryEditor.description,
            this.categoryToUpdate.img = this.categoryEditor.img,
            this.updateCategoryModalRef.hide();
            this.categoryEditor = {};
          },
          error => console.error(error)
      );
   }

  ngOnInit(): void {
    
  }

}
