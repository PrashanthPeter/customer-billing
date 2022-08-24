import { Component, OnInit } from '@angular/core';
import { CustomerDataService } from '../../services/customer/customer-data.service';
import { Customer } from '../../models/customer';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ConfirmationDialogService } from '../../confirmation-dialog/confirmation-dialog.service';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  customers: Customer[] = [];

  customerForm: FormGroup;
  customerName = new FormControl('');
  email = new FormControl('');
  address = new FormControl('');
  city = new FormControl('');
  state = new FormControl('');
  pincode = new FormControl('');

  currentCustomerId = 0;

  constructor(
    private customerService: CustomerDataService,
    private fb: FormBuilder ,
    private confirmationDialogService: ConfirmationDialogService
  ) 
  {
    this.customerForm = new FormGroup({
      customerName: this.customerName,
      email: this.email,
      address: this.address,
      city: this.city,
      state: this.state,
      pincode: this.pincode,
    });
  }
  

  ngOnInit(): void {
    this.getCustomers();
  }

 
  getCustomers() {
    this.customerService.getCustomers().subscribe((data) => {
      this.customers = data;
    });
  }

  addCustomer() {
    if (this.customerForm.valid) {
      let customer = new Customer();
      customer.customer_Name = this.customerName.value;
      customer.email = this.email.value;
      customer.address =
        this.address.value +
        ',' +
        this.city.value +
        ',' +
        this.state.value +
        ',' +
        this.pincode.value;
      if (this.currentCustomerId == 0) {
        this.customerService.createCustomer(customer).subscribe((data) => {
          this.customerForm.reset();
          this.getCustomers();
        });
      } else {
        this.customerService
          .updateCustomer(this.currentCustomerId, customer)
          .subscribe((data) => {
            this.customerForm.reset();
            this.getCustomers();
          });
      }
    }
  }

  editCustomer(id: number) {
    this.customerService.getCustomerById(id).subscribe((data) => {
      let address = data.address.split(',');
      this.currentCustomerId = data.id;
      this.customerName.setValue(data.customer_Name);
      this.email.setValue(data.email);
      this.address.setValue(address[0]);
      this.city.setValue(address[1]);
      this.state.setValue(address[2]);
      this.pincode.setValue(address[3]);
    });
  }
  public openConfirmationDialog() {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to ... ?')
    .then((confirmed) => console.log('User confirmed:', confirmed))
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
}

