export interface Customer {
    fullName: string;
    email: string;
    phoneNumber: string;
    dateOfRegistration: string;
    customerType: 'Individual' | 'Business';
    profilePicture?: string;
}
  