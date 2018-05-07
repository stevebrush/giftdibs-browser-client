export interface WishListPrivacy {
  type: 'everyone' | 'friends' | 'me' | 'custom';
  _allow?: string[];
}
