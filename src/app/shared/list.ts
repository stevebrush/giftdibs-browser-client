export interface List {
  id: number;
  name: string;
  isPrivate: boolean;
  gifts: {
    name: string;
    price: number;
    thumbnail: string;
  }[];
}
