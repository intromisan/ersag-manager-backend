import mongoose, { Document, Schema } from 'mongoose';
import { IInventory } from '../interfaces/inventory';

export interface IInventoryModel extends IInventory, Document {}

export const InventorySchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product' },
      itemAmount: { type: Number, default: 0 }
    }
  ]
});

const InventoryModel = mongoose.model<IInventoryModel>('Inventory', InventorySchema);

export default InventoryModel;
