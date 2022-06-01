export interface IInventory {
    userId: string;
    products: Array<{
        product: string;
        itemAmount: number;
    }>;
}
