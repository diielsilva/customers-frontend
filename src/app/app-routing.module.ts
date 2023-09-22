import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/components/login/login.component';
import { loginGuard } from './login/guards/login.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent, title: 'Realizar Autenticação', canActivate: [loginGuard] },
  { path: 'customers', loadChildren: () => import('./modules/customers/customers.module').then(module => module.CustomersModule), canActivate: [loginGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
