import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CustomerAddComponent } from './components/customer-add/customer-add.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { AccountListComponent } from './components/account-list/account-list.component';
import { AccountAddComponent } from './components/account-add/account-add.component';
import { TransactionAddComponent } from './components/transaction-add/transaction-add.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LayoutComponent } from './layout/layout.component';



const routes: Routes = [
  {path:'',
  component:LayoutComponent,
  children:[
  { path: '', redirectTo: 'customer-list', pathMatch: 'full' },
  { path: 'customer-add', component: CustomerAddComponent },
  { path: 'customer-list', component: CustomerListComponent },
  {path: 'account-add', component: AccountAddComponent},
  {path: 'account-list', component:AccountListComponent},
  {path: 'transaction-add', component:TransactionAddComponent},
  {path: 'transaction-list', component:TransactionListComponent},
  ],
},
];

@NgModule({
  declarations: [AppComponent, CustomerAddComponent, CustomerListComponent, AccountListComponent, AccountAddComponent, TransactionAddComponent, TransactionListComponent, SidebarComponent, LayoutComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes), // ✅ Add Routing
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
