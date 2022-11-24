export interface SessionUser {
  avatarUrl?: string;
  emailAddress?: string;
  emailAddressVerified?: boolean;
  facebookId?: string | undefined | null;
  firstName?: string;
  id?: string;
  lastName?: string;
  notificationSettings?: {
    [settingName: string]: {
      allowEmail?: boolean;
    };
  };
}
