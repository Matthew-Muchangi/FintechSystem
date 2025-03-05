export interface Transaction {
    id: string;
    customerName: string;
    accountNumber: string;
    transactionType: 'Deposit' | 'Withdrawal' | 'Transfer' | 'Loan Payment';
    amount: number;
    date: string;
    status: 'Pending' | 'Approved' | 'Rejected';
  }
  