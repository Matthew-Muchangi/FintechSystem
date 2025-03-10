import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from 'src/app/services/transaction.service';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/account.model';

@Component({
  selector: 'app-transaction-add',
  templateUrl: './transaction-add.component.html'
})
export class TransactionAddComponent {
  transactionForm: FormGroup;
  accounts: Account[] = [];
  isTransfer = false; // Track if Transfer is selected

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private accountService: AccountService,
    private router: Router
  ) {
    this.transactionForm = this.fb.group({
      accountNumber: ['', Validators.required],
      toAccountNumber: [''], // Destination account for transfer
      customerName: [{ value: '', disabled: true }],
      transactionType: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
      date: ['', Validators.required],
      status: ['', Validators.required],
    });

    this.loadAccounts();
    this.onTransactionTypeChange(); // Listen for type changes
  }

  private loadAccounts() {
    this.accounts = this.accountService.loadAccounts();
  }

  // Auto-fill customer name when selecting an account
  onAccountChange() {
    const selectedAccountNumber = this.transactionForm.value.accountNumber;
    const selectedAccount = this.accounts.find(acc => acc.accountNumber === selectedAccountNumber);
    if (selectedAccount) {
      this.transactionForm.patchValue({ customerName: selectedAccount.customerName });
    }
  }

  // Detect changes in transaction type
  onTransactionTypeChange() {
    this.transactionForm.get('transactionType')?.valueChanges.subscribe(value => {
      this.isTransfer = value === 'Transfer';
      if (!this.isTransfer) {
        this.transactionForm.patchValue({ toAccountNumber: '' }); // Reset destination account
      }
    });
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      const transactionData = this.transactionForm.value;

      // Ensure valid transfer (source and destination must be different)
      if (transactionData.transactionType === 'Transfer' &&
          transactionData.accountNumber === transactionData.toAccountNumber) {
        alert('Source and destination accounts must be different.');
        return;
      }

      this.transactionService.addTransaction(transactionData);
      this.router.navigate(['/transaction-list']); 
    }
  }
}
