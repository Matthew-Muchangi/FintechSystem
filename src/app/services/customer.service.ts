import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Customer } from '../customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private customers = new BehaviorSubject<Customer[]>(this.loadCustomers());
  customers$ = this.customers.asObservable();

  constructor() {}

  private loadCustomers(): Customer[] {
    const storedCustomers = localStorage.getItem('customers');
    return storedCustomers ? JSON.parse(storedCustomers) : [];
  }

  private saveCustomers(customers: Customer[]) {
    localStorage.setItem('customers', JSON.stringify(customers));
  }

  addCustomer(customer: Customer) {
    const updatedCustomers = [...this.customers.getValue(), { 
      ...customer, 
      profilePicture: customer.profilePicture || 'https://via.placeholder.com/50' // ✅ Ensure default value
    }];
    this.customers.next(updatedCustomers);
    this.saveCustomers(updatedCustomers);
  }
  

  getCustomers() {
    return this.customers$;
  }

  deleteCustomer(index: number) {
    const updatedCustomers = this.customers.getValue();
    updatedCustomers.splice(index, 1);
    this.customers.next(updatedCustomers);
    this.saveCustomers(updatedCustomers);
  }

  updateCustomer(index: number, updatedCustomer: Customer) {
    const customers = this.customers.getValue();
    if (index >= 0 && index < customers.length) {
      customers[index] = updatedCustomer;
      this.customers.next([...customers]);
      this.saveCustomers(customers);
    }
  }

  // ✅ Update an existing customer
updateCustomers(updatedCustomers: Customer[]) {
  this.customers.next(updatedCustomers); // Emit updated data
  this.saveCustomers(updatedCustomers); // Save to localStorage
}

}
