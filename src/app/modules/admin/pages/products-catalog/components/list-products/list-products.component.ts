import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormProductComponent } from '../form-product/form-product.component';
import { Product } from 'src/app/modules/shared/models/Product';
import Swal from 'sweetalert2';
import { StateService } from 'src/app/modules/shared/services/state/state.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
})
export class ListProductsComponent implements OnInit {
  public displayedColumns: string[] = [
    'name',
    'description',
    'price',
    'stock',
    'actions',
  ];
  public dataSource: Array<Product> = [];

  constructor(
    public dialog: MatDialog,
    private service: ProductsService,
    private state: StateService
  ) {}

  ngOnInit(): void {
    this.service.getProducts();
    this.getProducts();
  }

  getProducts() {
    this.state.stateProducts.subscribe((value) => {
      this.dataSource = [];
      for (let key in value) {
        this.dataSource.push(value[key]);
      }
    });
  }

  openModalForm() {
    const dialogRef = this.dialog.open(FormProductComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service
          .createProduct(result)
          .then(() => {
            Swal.fire({
              title: 'Enhorabuena',
              text: 'Producto creado exitosamente',
              icon: 'success',
            });
          })
          .catch(() => {
            Swal.fire({
              title: 'ooh',
              text: 'Ocurrió un error al intentar crear el producto',
              icon: 'error',
            });
          });
      }
    });
  }

  deleteProduct(element: Product) {
    Swal.fire({
      title: 'Eliminar producto',
      icon: 'info',
      text: 'Está seguro que desea eliminar este producto?',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: `Eliminar`,
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.service
          .deleteProduct(element)
          .then(() => {
            Swal.fire({
              title: 'Enhorabuena',
              text: 'Producto elminado exitosamente',
              icon: 'success',
            });
          })
          .catch(() => {
            Swal.fire({
              title: 'ooh',
              text: 'Ocurrió un error al intentar eliminar el producto',
              icon: 'error',
            });
          });
      }
    });
  }

  editProduct(element: Product) {
    const dialogRef = this.dialog.open(FormProductComponent, {
      data: element,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service
          .editProduct(result)
          .then(() => {
            Swal.fire({
              title: 'Enhorabuena',
              text: 'Producto actualizado exitosamente',
              icon: 'success',
            });
          })
          .catch(() => {
            Swal.fire({
              title: 'ooh',
              text: 'Ocurrió un error al intentar actualizar el producto',
              icon: 'error',
            });
          });
      }
    });
  }
}
