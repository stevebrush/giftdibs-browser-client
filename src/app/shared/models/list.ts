import { Gift } from './gift';

export interface List {
  id: number;
  name: string;
  isPrivate: boolean;
  gifts: Gift[];
}
