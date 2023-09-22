import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersListComponent } from './components/customers-list/customers-list.component';
import { InsertCustomerComponent } from './components/insert-customer/insert-customer.component';

const routes: Routes = [
  {
    path: '', children: [
      { path: '', component: CustomersListComponent, title: 'Lista de Clientes' },
      { path: 'insert', component: InsertCustomerComponent, title: 'Cadastrar Cliente' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
