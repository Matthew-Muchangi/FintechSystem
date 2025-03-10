export interface Customer {
name: any;
    fullName: string;
    email: string;
    phoneNumber: string;
    dateOfRegistration: string;
    customerType: 'Individual' | 'Business';
    profilePicture?: string;
}
  