export interface SessionUser {
  avatarUrl?: string;
  emailAddress?: string;
  emailAddressVerified?: boolean;
  firstName?: string;
  id?: string;
  lastName?: string;
  notificationSettings?: {
    [settingName: string]: {
      allowEmail?: boolean;
    };
  };
}
