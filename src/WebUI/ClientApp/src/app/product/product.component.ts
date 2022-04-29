import { importExpr } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { product } from '../models/product';
import { ProductsDto, ProductsVm, ProductClient, CreateProductCommand, CategoriesVm, CategoriesDto,CategoryClient } from '../web-api-client';
import { faTrash, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  vm: ProductsVm;
  vmCategories: CategoriesVm;
  selectedCategories: CategoriesDto;
  selectedProducts: ProductsDto;

  newProductModalRef: BsModalRef;
  newProductEditor: any = {};

  faTrash = faTrash;
  faPenSquare = faPenSquare;

  constructor(private productClient: ProductClient, private categoryClient: CategoryClient, private modalService: BsModalService) { 
    //TODO: maybe we can combine the observables with forkJoin operator.    
    productClient.get().subscribe(
      result => {
        this.vm = result;
        if(this.vm.products?.length){
          this.selectedProducts = this.vm.products[0];
        }
      },
      //TODO: perhaps instead of using console implement a toast or an alert to 
      //notice the user.
      error => console.error(error)
    );

    categoryClient.get().subscribe(
      result => {
        this.vmCategories = result;
        if(this.vmCategories.categories?.length){
          this.selectedCategories = this.vmCategories.categories[0];
        }
      },
      //TODO: perhaps instead of using console implement a toast or an alert to 
      //notice the user.
      error => console.error(error)
    )
  }

  showNewProductModal(template: TemplateRef<any>): void {
    this.newProductModalRef = this.modalService.show(template);
    setTimeout(() => document.getElementById("product").focus(), 250);
  }

  newProductCancelled(): void {
    this.newProductModalRef.hide();
    this.newProductEditor = {};
  }

  addProduct(): void {
    let product = ProductsDto.fromJS({
      id: 0,    
      categoryId: this.newProductEditor.categoryId,
      name: this.newProductEditor.name,
      description: this.newProductEditor.description,
      img: this.newProductEditor.img,
      price: this.newProductEditor.price,
      stock: this.newProductEditor.stock,
      minStock: this.newProductEditor.minStock
    });

    this.productClient.create(<CreateProductCommand>{ categoryId: this.newProductEditor.categoryId, name: this.newProductEditor.name}).subscribe(
      result => {
        product.id = result;
        this.vm.products.push(product);
        this.selectedProducts = product;
        this.newProductModalRef.hide();
        this.newProductEditor = {};
      },
      error => {
        let errors = JSON.parse(error.response);

        if(errors && errors.Title) {
          this.newProductEditor.error = errors.Title[0];
        }

        setTimeout(() => document.getElementById("name").focus(), 250);
      }
    )
    
  }

  public changeCategory(e) {
    this.newProductEditor.categoryId = e.target.value;
    console.log(e.target.value);
  }
  ngOnInit(): void {
  }

  public onKeyUpEvent(event: any){         
    let aux = event.target?.value;
    if(aux){
      console.log(aux);
    }
  }
}
