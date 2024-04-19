import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/modules/shared/models/Product';
import { ShoppingCartService } from '../../store/shopping-cart.service';
import { MatTable } from '@angular/material/table';
import Swal from 'sweetalert2';
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  public displayedColumns: string[] = [
    'name',
    'price',
    'count',
    'total',
    'actions',
  ];
  public dataSource: Array<Product> = [];
  @ViewChild(MatTable)
  table!: MatTable<Product>;

  constructor(
    public shoppingCart: ShoppingCartService,
    private dialog: MatDialogRef<any>
  ) {}

  ngOnInit(): void {
    this.dataSource = this.shoppingCart.getProducts();
  }

  deleteProduct(product: Product) {
    this.shoppingCart.removeProduct(product).then(() => {
      this.table.renderRows();
    });
  }

  saveOrder() {
    this.dialog.close(true);
  }
}
