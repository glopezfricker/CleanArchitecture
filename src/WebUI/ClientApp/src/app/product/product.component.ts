import { importExpr } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { product } from '../models/product';
import { ProductsDto, ProductsVm, ProductClient, CreateProductCommand, CategoriesVm, CategoriesDto,CategoryClient, UpdateProductCommand } from '../web-api-client';
import { faTrash, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import { NotificationService } from '../notification.service';

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
  productEditor: any = {};

  deleteProductModalRef: BsModalRef;
  updateProductModalRef: BsModalRef;

  productToDelete: ProductsDto;
  productToUpdate: ProductsDto;

  faTrash = faTrash;
  faPenSquare = faPenSquare;

  constructor(private productClient: ProductClient, private categoryClient: CategoryClient, private modalService: BsModalService, private notifyService: NotificationService) { 
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
    //TODO: implement a new Get method that returns a smaller dto.
    //We only need categoryId and description but me are getting img also.
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

    this.productClient.create(<CreateProductCommand>{ 
        categoryId: this.newProductEditor.categoryId, 
        name: this.newProductEditor.name,
        description: this.newProductEditor.description,
        img: this.newProductEditor.img,
        price: this.newProductEditor.price,
        stock: this.newProductEditor.stock,
        minStock: this.newProductEditor.minStock    
    }).subscribe(
      result => {
        product.id = result;
        this.vm.products.push(product);
        this.selectedProducts = product;
        this.newProductModalRef.hide();
        this.newProductEditor = {};
        this.notifyService.showSuccess("Producto Agregado Exitosamente.","Producto");
      },
      error => {
        let errors = JSON.parse(error.response);
        this.notifyService.showError("Se ha Producido un Error, no se Pudo Crear el Producto.", "Producto");
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

  confirmDeleteProduct(template: TemplateRef<any>, productToDelete: ProductsDto){
    this.productToDelete = productToDelete;
    this.deleteProductModalRef = this.modalService.show(template);
  }

  showProductEditorModal(template: TemplateRef<any>, productToUpdate: ProductsDto){
    //TODO: Check if we need both objects (productToUpdate, productEditor)
    this.productToUpdate = productToUpdate;
    this.productEditor = this.productToUpdate;
    this.updateProductModalRef = this.modalService.show(template);
  }

  deleteProductConfirmed(): void {
    this.productClient.delete(this.productToDelete.id).subscribe(
      () => {
        this.deleteProductModalRef.hide();
        this.vm.products = this.vm.products.filter(p => p.id != this.productToDelete.id)
        this.selectedProducts = this.vm.products.length ? this.vm.products[0] : null;
        this.notifyService.showSuccess("Producto Eliminado Exitosamente", "Productos");        
      }, //TODO: handle error instead of going to console
      error => {
        console.log(error);
        this.notifyService.showError("Se ha Producido un error, no se Pudo Eliminar el Producto.", "Producto");
      }
    )
  }

  updateProduct(){
    this.productClient.update(this.productToUpdate.id, UpdateProductCommand.fromJS(this.productEditor))
      .subscribe(
        () => {
          this.productToUpdate.categoryId = this.productEditor.categoryId,
          this.productToUpdate.name = this.productEditor.name,
          this.productToUpdate.description = this.productEditor.description,
          this.productToUpdate.img = this.productEditor.img,
          this.productToUpdate.price = this.productEditor.price,
          this.productToUpdate.stock = this.productEditor.stock,
          this.productToUpdate.minStock = this.productEditor.minStock
          this.updateProductModalRef.hide();
          this.productEditor = {};
          this.notifyService.showSuccess("Producto Modificado Exitosamente", "Productos");        
        }, //TODO: handle error instead of going to console
        error => {
          console.error(error),
          this.notifyService.showError("Se ha Producido un error, no se Pudo Modificar el Producto.", "Producto")
        }
      )
  }
  ngOnInit(): void {
  }
}
