import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../models/Product';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  public stateProducts = new BehaviorSubject<Array<Product>>([]);

  constructor() {}
}
