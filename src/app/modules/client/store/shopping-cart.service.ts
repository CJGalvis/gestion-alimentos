import { Injectable } from '@angular/core';
import { Product } from '../../shared/models/Product';
import { ShoppinCart } from '../../shared/models/ShoppinCart';
import { Auth } from '@angular/fire/auth';
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private listProducts: Array<Product> = [];
  public userState = new BehaviorSubject<string>('');

  constructor(private auth: Auth) {}

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
      if (this.listProducts[index].count! < this.listProducts[index].amount) {
        this.listProducts[index].count! += 1;
      }
    }

    return this.saveShoppingCart({
      products: this.listProducts,
      totalToPay: this.totalToPay(),
    });
  }

  subtractProduct(product: Product) {
    const index = this.listProducts.findIndex(
      (value) => value.key == product.key
    );

    if (this.listProducts[index].count! > 1) {
      this.listProducts[index].count! -= 1;
    }

    return this.saveShoppingCart({
      products: this.listProducts,
      totalToPay: this.totalToPay(),
    });
  }

  removeProduct(product: Product) {
    const index = this.listProducts.findIndex(
      (value) => value.key == product.key
    );

    if (index != -1) {
      this.listProducts.splice(index, 1);
    }

    return this.saveShoppingCart({
      products: this.listProducts,
      totalToPay: this.totalToPay(),
    });
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
      client: this.auth.currentUser?.uid,
    });
  }

  clearShoppingCart() {
    this.listProducts = [];
    const { uid } = this.auth.currentUser!;
    const db = getDatabase();
    const dataRef = ref(db, `shopping/${uid}`);
    return remove(dataRef);
  }

  private saveShoppingCart(shopping: ShoppinCart) {
    const { uid } = this.auth.currentUser!;
    const db = getDatabase();
    const refToSave = ref(db, `shopping/${uid}`);
    return set(refToSave, shopping);
  }

  public getShopping() {
    setTimeout(() => {
      const uid = this.auth.currentUser?.uid;
      this.userState.next(this.auth.currentUser?.email!);
      const db = getDatabase();
      const starCountRef = ref(db, `shopping/${uid}`);
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          this.listProducts = data.products;
        }
      });
    }, 500);
  }
}
