import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Transaction } from '../transaction.model';
import { AccountService } from './account.service';
import { Account } from '../account.model';

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
    const account = accounts.find(acc => acc.accountNumber === transaction.accountNumber);

    if (account) {
      if (transaction.transactionType === 'Deposit') {
        account.balance += transaction.amount;
      } else if (transaction.transactionType === 'Withdrawal' || transaction.transactionType === 'Loan Payment') {
        account.balance -= transaction.amount;
      }
      this.accountService.updateAccount(account);
    }
  }
}
