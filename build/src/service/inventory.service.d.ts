import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import { IInventoryModel } from '../models/inventory.model';
export declare function createUserInventory(input: DocumentDefinition<IInventoryModel>): Promise<IInventoryModel & {
    _id: any;
}>;
export declare function findPopulatedUserInventory(query: FilterQuery<IInventoryModel>, options?: QueryOptions): Promise<(IInventoryModel & {
    _id: any;
}) | null>;
export declare function findUserInventory(query: FilterQuery<IInventoryModel>, options?: QueryOptions): Promise<(IInventoryModel & {
    _id: any;
}) | null>;
export declare function updateUserInventory(query: FilterQuery<IInventoryModel>, update: UpdateQuery<IInventoryModel>, options: QueryOptions): Promise<(IInventoryModel & {
    _id: any;
}) | null>;
