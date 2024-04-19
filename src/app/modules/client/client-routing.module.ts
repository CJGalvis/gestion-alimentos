import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginClientComponent } from './pages/login-client/login-client.component';
import { RegisterClientComponent } from './pages/register-client/register-client.component';
import { CatalogClientComponent } from './pages/catalog-client/catalog-client.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'catalog',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginClientComponent,
  },
  {
    path: 'register',
    component: RegisterClientComponent,
  },
  {
    path: 'catalog',
    component: CatalogClientComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
