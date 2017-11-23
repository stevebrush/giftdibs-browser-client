export interface User {
  _id: string;
  facebookId?: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  emailAddressVerified: boolean;
}
