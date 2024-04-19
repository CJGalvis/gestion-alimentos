import { Product } from './Product';

export interface ShoppinCart {
  products: Array<Product>;
  totalToPay?: number;
  key?: string;
  user?: string;
}
