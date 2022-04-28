import { importExpr } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { product } from '../models/product';
import { ProductsDto, ProductsVm, ProductClient } from '../web-api-client';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  vm: ProductsVm;
  selectedProducts: ProductsDto;

  constructor(private productClient: ProductClient) { 

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

  ngOnInit(): void {
  }

  public onKeyUpEvent(event: any){         
    let aux = event.target?.value;
    if(aux){
      console.log(aux);
    }
  }
}
