import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Product from '../models/product.model';
import { createProductInput, deleteProductInput, readProductInput, updateProductInput } from '../schema/product.schema';
import { createProduct, findAllProducts, findAndDeleteProduct, findAndUpdateProduct, findProduct } from '../service/product.service';

export async function createProductHandler(req: Request<{}, {}, createProductInput['body']>, res: Response) {
  const body = req.body;

  try {
    const product = await createProduct({ ...body });
    return res.status(200).send(product);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
}
export async function updateProductHandler(req: Request<updateProductInput['params']>, res: Response) {
  const productId = req.params.productId;
  const update = req.body;

  try {
    const product = await findProduct({ productId });

    if (!product) return res.status(404);

    const updatedProduct = await findAndUpdateProduct({ productId }, update, { new: true });

    return res.status(200).send(updatedProduct);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
}

export async function getAllProductsHandler(req: Request, res: Response) {
  try {
    const products = await findAllProducts();
    return res.status(200).send(products);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
}

export async function getProductHandler(req: Request<readProductInput['params']>, res: Response) {
  const productId = req.params.productId;

  try {
    const product = await findProduct({ productId });

    if (!product) return res.status(404);

    return res.status(200).send(product);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
}
export async function deleteProductHandler(req: Request<deleteProductInput['params']>, res: Response) {
  const productId = req.params.productId;

  try {
    const product = await findProduct({ productId });

    if (!product) return res.status(404);

    await findAndDeleteProduct({ productId });
    return res.status(200).send('Deleted successfully');
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
}
