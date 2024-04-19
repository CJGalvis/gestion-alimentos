import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/admin/pages/login/services/auth.service';
import { ProductsService } from 'src/app/modules/admin/pages/products-catalog/services/products.service';
import { Product } from 'src/app/modules/shared/models/Product';
import { StateService } from 'src/app/modules/shared/services/state/state.service';
import { ShoppingCartService } from '../../store/shopping-cart.service';
import { ShoppingCartComponent } from '../../components/shopping-cart/shopping-cart.component';
import { MatDialog } from '@angular/material/dialog';

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
    private state: StateService,
    public shoppingCart: ShoppingCartService,
    public dialog: MatDialog
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
    this.shoppingCart.addProduct(item);
  }

  openShoppingCart() {
    const dialogRef = this.dialog.open(ShoppingCartComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }
}
