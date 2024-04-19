import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../models/Product';
import { ShoppinCart } from '../../models/ShoppinCart';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  public stateProducts = new BehaviorSubject<Array<Product>>([]);
  public shoppingCart = new BehaviorSubject<ShoppinCart>({
    products: [],
    TotalToPay: 0,
  });

  constructor() {}
}
