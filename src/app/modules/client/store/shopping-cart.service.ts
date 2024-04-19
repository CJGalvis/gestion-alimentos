import { Injectable } from '@angular/core';
import { Product } from '../../shared/models/Product';
import { BehaviorSubject } from 'rxjs';
import { ShoppinCart } from '../../shared/models/ShoppinCart';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private listProducts: Array<Product> = [];

  public shoppingCart = new BehaviorSubject<ShoppinCart>({
    products: [],
    TotalToPay: 0,
  });

  constructor() {}

  getProducts() {
    return this.listProducts;
  }

  addProduct(product: Product) {
    const index = this.listProducts.findIndex(
      (value) => value.key == product.key
    );

    if (index == -1) {
      this.listProducts.push(product);
    } else {
      this.listProducts[index].count! += 1;
    }
  }

  removeProduct(product: Product) {
    const index = this.listProducts.findIndex(
      (value) => value.key == product.key
    );

    if (index != -1) {
      this.listProducts.splice(index, 1);
    }
    console.log(this.listProducts);
  }

  productsLength(): number {
    return this.listProducts.reduce(
      (accumulator, currentValue) => accumulator + currentValue.count!,
      0
    );
  }

  totalToPay(): number {
    return this.listProducts.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.count! * currentValue.price,
      0
    );
  }
}
