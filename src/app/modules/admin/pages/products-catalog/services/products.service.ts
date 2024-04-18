import { Injectable } from '@angular/core';
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from '@angular/fire/database';
import { Auth } from '@angular/fire/auth';
import { StateService } from 'src/app/modules/shared/services/state/state.service';
import { Product } from 'src/app/modules/shared/models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private auth: Auth, private state: StateService) {}

  getFirebaseUser(): any {
    return this.auth.currentUser;
  }

  createProduct(product: Product) {
    const db = getDatabase();
    const dataRef = ref(db, `products`);
    return push(dataRef, product);
  }

  editProduct(product: Product) {
    const db = getDatabase();
    const dataRef = ref(db, `products/${product.key}`);
    return set(dataRef, product);
  }

  getProducts() {
    const db = getDatabase();
    const starCountRef = ref(db, `products`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      this.state.stateProducts.next(data);
    });
  }

  deleteProduct(product: Product) {
    const db = getDatabase();
    const dataRef = ref(db, `products/${product.key}`);
    return remove(dataRef);
  }
}
