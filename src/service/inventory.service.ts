import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import InventoryModel, { IInventoryModel } from '../models/inventory.model';

export async function createUserInventory(input: DocumentDefinition<IInventoryModel>) {
  return InventoryModel.create(input);
}

export async function findPopulatedUserInventory(query: FilterQuery<IInventoryModel>, options: QueryOptions = { lean: true }) {
  return InventoryModel.findOne(query, {}, options).populate('products.product');
}

export async function findUserInventory(query: FilterQuery<IInventoryModel>, options: QueryOptions = { lean: true }) {
  return InventoryModel.findOne(query, {}, options);
}

export async function updateUserInventory(query: FilterQuery<IInventoryModel>, update: UpdateQuery<IInventoryModel>, options: QueryOptions) {
  return InventoryModel.findOneAndUpdate(query, update, options);
}
