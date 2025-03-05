import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Account } from '../account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public accounts = new BehaviorSubject<Account[]>(this.loadAccounts());
  accounts$ = this.accounts.asObservable();

  constructor() {}

  // Load accounts from localStorage
  public loadAccounts(): Account[] {
    const storedAccounts = localStorage.getItem('accounts');
    return storedAccounts ? JSON.parse(storedAccounts) : [];
  }

  // Save accounts to localStorage
  public saveAccounts(accounts: Account[]) {
    localStorage.setItem('accounts', JSON.stringify(accounts));
  }

  // Get all accounts as observable
  getAccounts() {
    return this.accounts$;
  }

  // Add a new account
  addAccount(account: Account) {
    // Generate an account number (Random 10-digit number)
    account.accountNumber = this.generateAccountNumber();
  
    const updatedAccounts = [...this.accounts.getValue(), account];
    this.accounts.next(updatedAccounts);
    this.saveAccounts(updatedAccounts);
  }
  
  // Function to generate unique account numbers
  public generateAccountNumber(): string {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString(); // 10-digit number
  }

  // Update a specific account
  updateAccount(updatedAccount: Account) {
    const accounts = this.accounts.getValue();
    const index = accounts.findIndex(acc => acc.accountNumber === updatedAccount.accountNumber);

    if (index !== -1) {
      accounts[index] = updatedAccount; // Update the account
      this.accounts.next([...accounts]); // Notify subscribers
      this.saveAccounts(accounts); // Persist to local storage
    }
  }

  // Delete an account
  deleteAccount(index: number) {
    const updatedAccounts = this.accounts.getValue();
    updatedAccounts.splice(index, 1);
    this.accounts.next(updatedAccounts);
    this.saveAccounts(updatedAccounts);
  }
}
