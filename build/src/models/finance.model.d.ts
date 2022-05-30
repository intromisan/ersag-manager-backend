import mongoose, { Document, Schema } from 'mongoose';
import { IUserFinance } from '../interfaces/finance';
export interface IUserFinanceModel extends IUserFinance, Document {
}
export declare const UserFinanceSchema: Schema;
declare const UserFinanceModel: mongoose.Model<IUserFinanceModel, {}, {}, {}>;
export default UserFinanceModel;
