import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from 'src/app/services/transaction.service';
import { AccountService } from 'src/app/services/account.service';
import { Transaction } from 'src/app/transaction.model';
import { Account } from 'src/app/account.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-add',
  templateUrl: './transaction-add.component.html'
})
export class TransactionAddComponent {
  transactionForm: FormGroup;
  accounts: Account[] = []; // Explicitly define the type as Account[]
 

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private accountService: AccountService,
    private router: Router  // Inject Router
  ) {
    this.transactionForm = this.fb.group({
      accountNumber: ['', Validators.required],
      customerName: [{ value: '', disabled: true }], // Auto-filled based on account selection
      transactionType: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
      date: ['', Validators.required],
      status: ['', Validators.required],
    });

    this.loadAccounts(); // Load accounts
  }

  // Load accounts and assign them correctly
  private loadAccounts() {
    this.accounts = this.accountService.loadAccounts(); // Now TypeScript knows accounts is Account[]
  }

  // When an account is selected, auto-fill the customer name
  onAccountChange() {
    const selectedAccountNumber = this.transactionForm.value.accountNumber;
    const selectedAccount = this.accounts.find(acc => acc.accountNumber === selectedAccountNumber);

    if (selectedAccount) {
      this.transactionForm.patchValue({ customerName: selectedAccount.customerName });
    }
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      this.transactionService.addTransaction(this.transactionForm.value);
      this.router.navigate(['/transaction-list']); // Redirect after adding
    }
  }
}
