import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/shared/services/auth/auth.service';
import { ProductsService } from 'src/app/modules/admin/pages/products-catalog/services/products.service';
import { Product } from 'src/app/modules/shared/models/Product';
import { StateService } from 'src/app/modules/shared/services/state/state.service';
import { ShoppingCartService } from '../../store/shopping-cart.service';
import { ShoppingCartComponent } from '../../components/shopping-cart/shopping-cart.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

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
    this.shoppingCart.getShopping();
    this.getProducts();

    this.shoppingCart.userState;
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
      this.router.navigate(['client/login']);
    });
  }

  addToCart(item: Product) {
    if (this.auth.getSession().currentUser) {
      this.shoppingCart.addProduct(item).then(() => {
        Swal.fire({
          title: 'Enhorabuena',
          text: 'Producto agregado exitosamente',
          icon: 'success',
        });
      });
    } else {
      Swal.fire({
        icon: 'info',
        title: 'No estás registrado',
        text: 'Para crear un carrito de compras primero debes iniciar sesión.',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Login',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['client/login']);
        }
      });
    }
  }

  openShoppingCart() {
    const dialogRef = this.dialog.open(ShoppingCartComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        Swal.fire({
          title: 'Hacer pedido',
          text: 'Quieres realizar este pedido',
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonText: 'Comprar',
        }).then((result) => {
          if (result.isConfirmed) {
            this.shoppingCart.saveOrder().then(() => {
              this.shoppingCart.clearShoppingCart().then(() => {
                Swal.fire({
                  title: 'Enhorabuena',
                  text: 'Tu pedido ha sido guardado exitosamente',
                  icon: 'success',
                });
              });
            });
          }
        });
      }
    });
  }

  get user$(): Observable<string> {
    return this.shoppingCart.userState.asObservable();
  }
}
