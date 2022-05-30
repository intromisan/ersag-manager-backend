import mongoose, { Document } from 'mongoose';
import { IProduct } from '../interfaces/product';
export interface IProductModel extends IProduct, Document {
}
declare const ProductModel: mongoose.Model<IProductModel, {}, {}, {}>;
export default ProductModel;
