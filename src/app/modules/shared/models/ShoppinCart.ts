import { Product } from './Product';

export interface ShoppinCart {
  products: Array<Product>;
  TotalToPay?: number;
}
