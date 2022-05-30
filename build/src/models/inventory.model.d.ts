import mongoose, { Document, Schema } from 'mongoose';
import { IInventory } from '../interfaces/inventory';
export interface IInventoryModel extends IInventory, Document {
}
export declare const InventorySchema: Schema;
declare const InventoryModel: mongoose.Model<IInventoryModel, {}, {}, {}>;
export default InventoryModel;
