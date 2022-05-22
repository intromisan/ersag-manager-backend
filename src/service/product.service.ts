import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import ProductModel, { IProductModel } from '../models/product.model';

export async function createProduct(input: DocumentDefinition<Omit<IProductModel, 'createdAt' | 'updatedAt'>>) {
  return ProductModel.create(input);
}

export async function findAllProducts() {
  return ProductModel.find();
}

export async function findProduct(query: FilterQuery<IProductModel>, options: QueryOptions = { lean: true }) {
  return ProductModel.findOne(query, {}, options);
}

export async function findAndUpdateProduct(query: FilterQuery<IProductModel>, update: UpdateQuery<IProductModel>, options: QueryOptions) {
  return ProductModel.findOneAndUpdate(query, update, options);
}

export async function findAndDeleteProduct(query: FilterQuery<IProductModel>) {
  return ProductModel.findOneAndDelete(query);
}
