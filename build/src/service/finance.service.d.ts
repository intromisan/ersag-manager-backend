import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import { IUserFinanceModel } from '../models/finance.model';
export declare function createUserFinance(input: DocumentDefinition<IUserFinanceModel>): Promise<IUserFinanceModel & {
    _id: any;
}>;
export declare function findUserFinance(query: FilterQuery<IUserFinanceModel>, options?: QueryOptions): Promise<(IUserFinanceModel & {
    _id: any;
}) | null>;
export declare function updateUserFinance(query: FilterQuery<IUserFinanceModel>, update: UpdateQuery<IUserFinanceModel>, options: QueryOptions): Promise<(IUserFinanceModel & {
    _id: any;
}) | null>;
export declare function updateUserBalance(query: FilterQuery<IUserFinanceModel>, update: number, options: QueryOptions): Promise<(IUserFinanceModel & {
    _id: any;
}) | null>;
export declare function updateInventoryTotalValue(query: FilterQuery<IUserFinanceModel>, update: number, options: QueryOptions): Promise<(IUserFinanceModel & {
    _id: any;
}) | null>;
