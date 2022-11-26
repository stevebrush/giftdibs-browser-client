export interface User {
  avatarUrl?: string;
  dateLastLoggedIn?: Date;
  id?: string;
  emailAddress?: string;
  emailAddressVerified?: boolean;
  firstName?: string;
  lastName?: string;
  notificationSettings?: {
    [settingName: string]: {
      allowEmail?: boolean;
    };
  };
}
