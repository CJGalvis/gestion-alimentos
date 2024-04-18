import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { ProductsCatalogComponent } from './pages/products-catalog/products-catalog.component';
import { OrdersManagementComponent } from './pages/orders-management/orders-management.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      {
        path: '',
        redirectTo: 'products-catalog',
        pathMatch: 'full',
      },
      {
        path: 'products-catalog',
        component: ProductsCatalogComponent,
      },
      {
        path: 'orders-management',
        component: OrdersManagementComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
