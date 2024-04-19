import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { ProductsCatalogComponent } from './pages/products-catalog/products-catalog.component';
import { OrdersManagementComponent } from './pages/orders-management/orders-management.component';
import { LoginComponent } from './pages/login/login.component';
import {
  AuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(['admin/login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['admin/dashboard']);

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedInToHome },
  },
  {
    path: 'dashboard',
    component: NavComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
