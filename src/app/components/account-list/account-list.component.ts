import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/account.model';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  accounts: Account[] = [];
  editIndex: number | null = null;
  accountForm: FormGroup;

  constructor(private accountService: AccountService, private fb: FormBuilder) {
    this.accountForm = this.fb.group({
      accountType: [''],
      status: ['']
    });
  }

  ngOnInit() {
    this.accountService.getAccounts().subscribe(accounts => {
      this.accounts = accounts;
    });
  }

  startEditing(index: number) {
    this.editIndex = index;
    this.accountForm.setValue({
      accountType: this.accounts[index].accountType,
      status: this.accounts[index].status
    });
  }

  saveEdit() {
    if (this.editIndex !== null) {
      const updatedAccount = { ...this.accounts[this.editIndex] };
      updatedAccount.accountType = this.accountForm.value.accountType;
      updatedAccount.status = this.accountForm.value.status;

      this.accountService.updateAccount(updatedAccount);
      this.accounts[this.editIndex] = updatedAccount;
      this.cancelEdit();
    }
  }

  cancelEdit() {
    this.editIndex = null;
    this.accountForm.reset();
  }

  deleteAccount(index: number) {
    this.accountService.deleteAccount(index);
  }
}
