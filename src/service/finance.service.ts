import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import UserFinanceModel, { IUserFinanceModel } from '../models/finance.model';

export async function createUserFinance(input: DocumentDefinition<IUserFinanceModel>) {
  return UserFinanceModel.create(input);
}

export async function findUserFinance(query: FilterQuery<IUserFinanceModel>, options: QueryOptions = { lean: true }) {
  return UserFinanceModel.findOne(query, {}, options);
}

export async function updateUserFinance(query: FilterQuery<IUserFinanceModel>, update: UpdateQuery<IUserFinanceModel>, options: QueryOptions) {
  return UserFinanceModel.findOneAndUpdate(query, update, options);
}

export async function updateUserBalance(query: FilterQuery<IUserFinanceModel>, update: number, options: QueryOptions) {
  return UserFinanceModel.findOneAndUpdate(
    query,
    {
      $set: {
        balance: update
      }
    },
    options
  );
}
export async function updateInventoryTotalValue(query: FilterQuery<IUserFinanceModel>, update: number, options: QueryOptions) {
  return UserFinanceModel.findOneAndUpdate(
    query,
    {
      $set: {
        inventoryTotalValue: update
      }
    },
    options
  );
}
