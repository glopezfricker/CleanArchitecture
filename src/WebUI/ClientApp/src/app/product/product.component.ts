import { importExpr } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { product } from '../models/product';
import { ProductsDto, ProductsVm, ProductClient, CreateProductCommand } from '../web-api-client';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  vm: ProductsVm;
  selectedProducts: ProductsDto;

  newProductModalRef: BsModalRef;
  newProductEditor: any = {};

  constructor(private productClient: ProductClient, private modalService: BsModalService) { 

    productClient.get().subscribe(
      result => {
        this.vm = result;
        if(this.vm.products?.length){
          this.selectedProducts = this.vm.products[0];
        }
      },
      error => console.error(error)
    );
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

  ngOnInit(): void {
  }

  public onKeyUpEvent(event: any){         
    let aux = event.target?.value;
    if(aux){
      console.log(aux);
    }
  }
}
