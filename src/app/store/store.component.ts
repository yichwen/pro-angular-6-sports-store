import { Component } from "@angular/core";
import { ProductRepository } from '../model/product.repository';
import { Product } from '../model/product.model';
import { Cart } from '../model/cart.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-store',
  templateUrl: './store.component.html'
})
export class StoreComponent {

  selectedCategory = null;
  productsPerPage = 4;
  selectedPage = 1;

  constructor(
    private repository: ProductRepository,
    private cart: Cart,
    private router: Router
  ) {}

  // property: products
  // will re-render if selectedCategory, productsPerPage, or selectedPage is changed
  get products(): Product[] {
    let pageIndex = (this.selectedPage - 1) * this.productsPerPage;
    return this.repository.getProducts(this.selectedCategory)
      .slice(pageIndex, pageIndex + this.productsPerPage);
  }

  // property: categories
  get categories(): String[] {
    return this.repository.getCategories();
  }

  // to change category 
  changeCategory(newCategory?: string) {
    this.selectedCategory = newCategory;
  }

  changePage(newPage: number) {
    this.selectedPage = newPage;
  }

  changePageSize(newSize: number) {
    this.productsPerPage = Number(newSize);
    this.changePage(1);
  }

  get pageCount(): number {
    return Math.ceil(this.repository.getProducts(this.selectedCategory).length / this.productsPerPage);
  }

  // get pageNumbers(): number[] {
  //   return Array(Math.ceil(this.repository.getProducts(this.selectedCateogory).length / this.productsPerPage))
  //     .fill(0).map((x, i) => i + 1);
  // }

  addProductToCart(product: Product) {
    this.cart.addLine(product);
    // after add product to the cart line, then navigate to /cart
    this.router.navigateByUrl('/cart');
  }

}