export interface WishListPrivacy {
  type: 'everyone' | 'me' | 'custom';
  allowedUserIds?: string[];
}
