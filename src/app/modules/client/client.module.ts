import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { LoginClientComponent } from './pages/login-client/login-client.component';
import { RegisterClientComponent } from './pages/register-client/register-client.component';
import { CatalogClientComponent } from './pages/catalog-client/catalog-client.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LoginClientComponent,
    RegisterClientComponent,
    CatalogClientComponent,
    ShoppingCartComponent,
  ],
  imports: [CommonModule, ClientRoutingModule, SharedModule],
})
export class ClientModule {}
