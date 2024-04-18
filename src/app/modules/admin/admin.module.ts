import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { SharedModule } from '../shared/shared.module';
import { ProductsCatalogComponent } from './pages/products-catalog/products-catalog.component';
import { OrdersManagementComponent } from './pages/orders-management/orders-management.component';
import { UsersComponent } from './pages/users/users.component';
import { FormProductComponent } from './pages/products-catalog/components/form-product/form-product.component';
import { ListProductsComponent } from './pages/products-catalog/components/list-products/list-products.component';

@NgModule({
  declarations: [
    NavComponent,
    ProductsCatalogComponent,
    OrdersManagementComponent,
    UsersComponent,
    FormProductComponent,
    ListProductsComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
})
export class AdminModule {}
