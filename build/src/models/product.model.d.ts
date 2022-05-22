import mongoose, { Document } from 'mongoose';
export interface IProduct {
    name: string;
    code: string;
    volume: string;
    price: string;
    withDevice?: boolean;
    image?: string;
}
export interface IProductModel extends IProduct, Document {
}
declare const _default: mongoose.Model<IProductModel, {}, {}, {}>;
export default _default;
