export interface Account {
    id: string; 
    customerName: string; 
    accountNumber: string; 
    accountType: 'Savings' | 'Checking' | 'Business'; 
    balance: number; 
    status: 'Active' | 'Suspended' | 'Closed'; 
    createdAt: Date; 
}