import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { CustomerService } from 'src/app/services/customer.service';
import { Router } from '@angular/router';
import { Account } from 'src/app/account.model';
import { Customer } from 'src/app/customer.model';

@Component({
  selector: 'app-account-add',
  templateUrl: './account-add.component.html',
  styleUrls: ['./account-add.component.css']
})
export class AccountAddComponent implements OnInit {
  accountForm!: FormGroup;
  customers: Customer[] = [];

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadCustomers();
  }

  // Initialize the account form
  private initializeForm() {
    this.accountForm = this.fb.group({
      customerName: ['', Validators.required],
      accountType: ['', Validators.required],
      balance: [0, [Validators.required, Validators.min(0)]],
      status: ['Active', Validators.required]
    });
  }

  // Load existing customers for selection
  private loadCustomers() {
    this.customerService.getCustomers().subscribe(customers => {
      this.customers = customers;
    });
  }

  // Handle form submission
  onSubmit() {
    if (this.accountForm.invalid) {
      return;
    }

    const newAccount: Account = this.accountForm.value;
    this.accountService.addAccount(newAccount);
    alert('Account successfully created!');
    this.router.navigate(['/account-list']);
  }
}
