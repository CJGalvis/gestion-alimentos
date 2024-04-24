import { Injectable } from '@angular/core';
import { Product } from '../../shared/models/Product';
import { Auth } from '@angular/fire/auth';
import { getDatabase, push, ref } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../shared/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private listProducts: Array<Product> = [];
  public userState = new BehaviorSubject<string>('');

  constructor(private auth: Auth, private authService: AuthService) {}

  getProducts() {
    return this.listProducts;
  }

  async addProduct(product: Product) {
    const index = this.listProducts.findIndex(
      (value) => value.key == product.key
    );

    if (index == -1) {
      product.count = 1;
      this.listProducts.push(product);
    } else {
      this.listProducts[index]['count']! += 1;
    }
    product.stock--;
  }

  async subtractProduct(product: Product) {
    const index = this.listProducts.findIndex(
      (value) => value.key == product.key
    );

    if (this.listProducts[index].count! > 1) {
      this.listProducts[index]['count']! -= 1;
    }

    product.stock++;
  }

  removeProduct(product: Product) {
    const index = this.listProducts.findIndex(
      (value) => value.key == product.key
    );

    if (index != -1) {
      this.listProducts.splice(index, 1);
    }

    product.stock += product.count!;
    product.count = 0;
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

  saveOrder() {
    const db = getDatabase();
    const dataRef = ref(db, `orders`);
    return push(dataRef, {
      products: this.listProducts,
      totalToPay: this.totalToPay(),
      client: this.authService.getSessionUserData().email,
      date: new Date().getTime(),
      id: new Date().getTime(),
    });
  }

  clearShoppingCart() {
    this.listProducts = [];
  }
}
