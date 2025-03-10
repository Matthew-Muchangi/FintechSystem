import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transactions = new BehaviorSubject<Transaction[]>(this.loadTransactions());
  transactions$ = this.transactions.asObservable();

  constructor(private accountService: AccountService) {}

  // Load transactions from localStorage
  private loadTransactions(): Transaction[] {
    const storedTransactions = localStorage.getItem('transactions');
    return storedTransactions ? JSON.parse(storedTransactions) : [];
  }

  // Save transactions to localStorage
  private saveTransactions(transactions: Transaction[]) {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }

  // Get all transactions
  getTransactions() {
    return this.transactions$;
  }

  // Add a new transaction
  addTransaction(transaction: Transaction) {
    const updatedTransactions = [...this.transactions.getValue(), transaction];
    this.transactions.next(updatedTransactions);
    this.saveTransactions(updatedTransactions);
    this.updateAccountBalance(transaction);
  }

  // Delete transaction
  deleteTransaction(index: number) {
    const updatedTransactions = this.transactions.getValue();
    updatedTransactions.splice(index, 1);
    this.transactions.next(updatedTransactions);
    this.saveTransactions(updatedTransactions);
  }

  // Update account balance based on transaction type
  private updateAccountBalance(transaction: Transaction) {
    const accounts = this.accountService.loadAccounts();
  
    // Find the source account (sender)
    const sourceAccount = accounts.find(acc => acc.accountNumber === transaction.accountNumber);
  
    if (sourceAccount) {
      if (transaction.transactionType === 'Deposit') {
        sourceAccount.balance += transaction.amount;
      } else if (transaction.transactionType === 'Withdrawal' || transaction.transactionType === 'Loan Payment') {
        sourceAccount.balance -= transaction.amount;
      } else if (transaction.transactionType === 'Transfer') {
        // Find the destination account (receiver)
        const destinationAccount = accounts.find(acc => acc.accountNumber === transaction.accountNumber);
  
        if (destinationAccount && sourceAccount.balance >= transaction.amount) {
          // Deduct from source (sender)
          sourceAccount.balance -= transaction.amount;
          // Add to destination (receiver)
          destinationAccount.balance += transaction.amount;
          // Update both accounts
          this.accountService.updateAccount(sourceAccount);
          this.accountService.updateAccount(destinationAccount);
        } else {
          console.error('Transfer failed: Insufficient balance or invalid destination account');
        }
      }
  
      // Update the account after transaction
      this.accountService.updateAccount(sourceAccount);
    }
  }
  
}
