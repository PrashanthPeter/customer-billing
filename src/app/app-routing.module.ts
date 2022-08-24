import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './components/customer/customer.component';
import { ItemsComponent } from './components/items/items.component';
import { InvoiceComponent } from './components/invoice/invoice.component';

const routes: Routes = [
  { path: 'customer', component: CustomerComponent },
  { path: 'items', component: ItemsComponent },
  {path: 'invoice' , component: InvoiceComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
