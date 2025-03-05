import { Component } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { Transaction } from 'src/app/transaction.model';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html'
})
export class TransactionListComponent {
  transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService) {
    this.transactionService.getTransactions().subscribe(data => {
      this.transactions = data;
    });
  }

  deleteTransaction(index: number) {
    this.transactionService.deleteTransaction(index);
  }
}
