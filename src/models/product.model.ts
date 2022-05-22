import mongoose, { Document, Schema } from 'mongoose';
import { IProduct } from '../interfaces/product';

export interface IProductModel extends IProduct, Document {}

const productSchema: Schema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, required: true, auto: true },
    name: { type: String, required: true },
    code: { type: String, required: true },
    volume: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    withDevice: { type: Boolean, required: true }
  },
  {
    timestamps: true
  }
);

const ProductModel = mongoose.model<IProductModel>('Product', productSchema);

export default ProductModel;
