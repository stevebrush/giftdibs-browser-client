export interface Friendship {
  _id: string;
  friend: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  user: {
    _id: string;
    firstName: string;
    lastName: string;
  };
}
