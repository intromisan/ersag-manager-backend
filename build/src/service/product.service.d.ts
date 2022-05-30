import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import { IProductModel } from '../models/product.model';
export declare function createProduct(input: DocumentDefinition<Omit<IProductModel, 'createdAt' | 'updatedAt'>>): Promise<IProductModel & {
    _id: any;
}>;
export declare function findAllProducts(): Promise<(IProductModel & {
    _id: any;
})[]>;
export declare function findProduct(query: FilterQuery<IProductModel>, options?: QueryOptions): Promise<(IProductModel & {
    _id: any;
}) | null>;
export declare function findAndUpdateProduct(query: FilterQuery<IProductModel>, update: UpdateQuery<IProductModel>, options: QueryOptions): Promise<(IProductModel & {
    _id: any;
}) | null>;
export declare function findAndDeleteProduct(query: FilterQuery<IProductModel>): Promise<(IProductModel & {
    _id: any;
}) | null>;
