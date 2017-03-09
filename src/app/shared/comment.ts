export interface Comment {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    thumbnail: string;
  };
  body: string;
}
