import { Component, TemplateRef, OnInit } from '@angular/core';
import { CategoriesDto, CategoriesVm,  CategoryClient, CreateCategoryCommand} from '../web-api-client';
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

  deleteCategoryModalRef: BsModalRef;
  categoryToDelete: CategoriesDto;

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

  ngOnInit(): void {
    
  }

}
