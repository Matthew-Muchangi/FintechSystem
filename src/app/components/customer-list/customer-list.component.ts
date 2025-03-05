import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/customer.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  editIndex: number | null = null;
  editForm: FormGroup;

  constructor(private customerService: CustomerService, private fb: FormBuilder) {
    this.editForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\+?[0-9]*$')]],
      customerType: ['', Validators.required],
      dateOfRegistration: ['', Validators.required],
      profilePicture: [''], // Add profile picture field
    });
  }

  ngOnInit() {
    this.customerService.getCustomers().subscribe((customers) => {
      this.customers = customers;
    });
  }

  startEditing(index: number) {
    this.editIndex = index;
    this.editForm.setValue(this.customers[index]);
  }

  saveEdit() {
    if (this.editIndex !== null && this.editForm.valid) {
      const updatedCustomers = [...this.customers];
      updatedCustomers[this.editIndex] = this.editForm.value;
      this.customerService.updateCustomer(this.editIndex, this.editForm.value);
      this.editIndex = null;
    }
  }

  cancelEdit() {
    this.editIndex = null;
  }

  deleteCustomer(index: number) {
    this.customerService.deleteCustomer(index);
  }

  onFileSelected(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.editForm.patchValue({ profilePicture: reader.result }); // Save as base64
      };
      reader.readAsDataURL(file);
    }
  }

}
