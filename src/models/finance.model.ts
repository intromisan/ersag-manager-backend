import mongoose, { Document, model, Schema, SchemaTypes } from 'mongoose';
import { IUserFinance } from '../interfaces/finance';

export interface IUserFinanceModel extends IUserFinance, Document {}

export const UserFinanceSchema: Schema = new Schema({
  userId: {
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },
  balance: {
    type: SchemaTypes.Number,
    default: 0,
    required: true
  },
  discountPercentage: {
    type: SchemaTypes.Decimal128,
    deafult: 0,
    required: true
  },
  inventoryTotalValue: {
    type: SchemaTypes.Number,
    deafult: 0,
    required: true
  }
});

const UserFinanceModel = model<IUserFinanceModel>('Finance', UserFinanceSchema);

export default UserFinanceModel;
