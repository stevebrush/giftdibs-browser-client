export interface User {
  avatarUrl?: string;
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
