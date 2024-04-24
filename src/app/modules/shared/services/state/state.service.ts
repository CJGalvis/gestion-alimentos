import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../models/Product';
import { Order } from '../../models/Order';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  public stateProducts = new BehaviorSubject<Array<Product>>([]);
  public stateOrders = new BehaviorSubject<Array<Order>>([]);

  constructor() {}
}
