import { Component, OnInit } from '@angular/core';
import { OrdersService } from './services/orders.service';
import { StateService } from 'src/app/modules/shared/services/state/state.service';

@Component({
  selector: 'app-orders-management',
  templateUrl: './orders-management.component.html',
  styleUrls: ['./orders-management.component.css'],
})
export class OrdersManagementComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'date', 'client', 'total'];
  public dataSource: Array<any> = [];

  constructor(
    private ordersService: OrdersService,
    private state: StateService
  ) {}

  ngOnInit(): void {
    this.ordersService.getOrders();
    this.getProducts();
  }

  getProducts() {
    this.state.stateOrders.subscribe((value) => {
      this.dataSource = [];
      for (let key in value) {
        this.dataSource.push(value[key]);
      }
    });
  }
}
