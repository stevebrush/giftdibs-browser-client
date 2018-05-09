export interface WishListPrivacy {
  type: 'everyone' | 'me' | 'custom';
  _allow?: string[];
}
