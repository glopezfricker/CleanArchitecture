import { Component, OnInit } from '@angular/core';
import { CategoriesDto, CategoriesVm,  CategoryClient} from '../web-api-client';
//import { faPlus, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  vm: CategoriesVm;
  selectedCategories: CategoriesDto;

  constructor(private categoryClient: CategoryClient) { 
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

  ngOnInit(): void {
  }

}
