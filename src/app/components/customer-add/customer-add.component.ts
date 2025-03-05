import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css'],
})
export class CustomerAddComponent {
  customerForm: FormGroup;
  profilePicture: string | null = null; // Stores the uploaded image

  constructor(private fb: FormBuilder, private customerService: CustomerService, private router: Router) {
    this.customerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      dateOfRegistration: ['', Validators.required],
      customerType: ['', Validators.required],
      profilePicture: [''], // Stores Base64 image
    });
  }

  // Handle Profile Picture Upload
  handleImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePicture = reader.result as string; // Show preview
        this.customerForm.patchValue({ profilePicture: reader.result }); // Save image as Base64
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.customerForm.valid) {
      this.customerService.addCustomer(this.customerForm.value);
      this.router.navigate(['/customer-list']); // Redirect after adding
    }
  }
}
