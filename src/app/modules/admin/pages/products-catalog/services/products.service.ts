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

  async createProduct(product: Product) {
    const db = getDatabase();
    const dataRef = ref(db, `products`);
    const data = push(dataRef, product);
    product.key = data.key!;
    const refData = ref(db, `products/${data.key}`);
    return set(refData, product);
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
      const dataList = [];
      for (let key in data) {
        dataList.push(data[key]);
      }
      this.state.stateProducts.next(dataList);
    });
  }

  deleteProduct(product: Product) {
    const db = getDatabase();
    const dataRef = ref(db, `products/${product.key}`);
    return remove(dataRef);
  }
}
