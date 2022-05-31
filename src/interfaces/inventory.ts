import { IProduct } from './product';

export interface IInventory {
  userId: string;
  products: {
    product: string;
    itemAmount: number;
  }[];
}
