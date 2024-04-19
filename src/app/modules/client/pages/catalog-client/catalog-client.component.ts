import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, count, map, shareReplay } from 'rxjs';
import { AuthService } from 'src/app/modules/admin/pages/login/services/auth.service';
import { ProductsService } from 'src/app/modules/admin/pages/products-catalog/services/products.service';
import { Product } from 'src/app/modules/shared/models/Product';
import { StateService } from 'src/app/modules/shared/services/state/state.service';

@Component({
  selector: 'app-catalog-client',
  templateUrl: './catalog-client.component.html',
  styleUrls: ['./catalog-client.component.css'],
})
export class CatalogClientComponent implements OnInit {
  public dataList: Array<Product> = [];
  constructor(
    private auth: AuthService,
    private router: Router,
    private productService: ProductsService,
    private state: StateService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts();
    this.getProducts();
  }

  getProducts() {
    this.state.stateProducts.subscribe((value) => {
      this.dataList = [];
      for (let key in value) {
        const data = {
          key,
          ...value[key],
          count: 1,
        };
        this.dataList.push(data);
      }
    });
  }

  logout() {
    this.auth.logout().then(() => {
      this.router.navigate(['admin/login']);
    });
  }

  addToCart(item: Product) {
    const shoppingCart = this.state.shoppingCart.getValue();

    const index = shoppingCart.products?.findIndex(
      (value) => value.key == item.key
    );

    if (index == -1) {
      shoppingCart.products?.push(item);
    } else {
      shoppingCart.products[index].count! += 1;
    }
    this.state.shoppingCart.next(shoppingCart);
    console.log(this.state.shoppingCart.getValue());
  }

  get shoppingCartLength$(): number {
    return this.state.shoppingCart
      .getValue()
      .products.reduce(
        (accumulator, currentValue) => accumulator + currentValue.count!,
        0
      );
  }
}
