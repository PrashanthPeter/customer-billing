import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../../models/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerDataService {
  customerUrl = 'https://localhost:44311/api/Customer';
  constructor(private http: HttpClient) {}
  getCustomers() {
    return this.http.get<Customer[]>(this.customerUrl);
  }

  getCustomerById(id: number) {
    var url = this.customerUrl + '/' + id;
    return this.http.get<Customer>(url);
  }

  createCustomer(customer: Customer) {
    return this.http.post(this.customerUrl, customer);
  }

  updateCustomer(id: number, customer: Customer) {
    var url = this.customerUrl + '/' + id;
    return this.http.put(url, customer);
  }
}
