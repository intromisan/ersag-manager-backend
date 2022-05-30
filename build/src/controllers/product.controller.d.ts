import { Request, Response } from 'express';
import { createProductInput, deleteProductInput, readProductInput, updateProductInput } from '../schema/product.schema';
export declare function createProductHandler(req: Request<{}, {}, createProductInput['body']>, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function updateProductHandler(req: Request<updateProductInput['params']>, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function getAllProductsHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function getProductHandler(req: Request<readProductInput['params']>, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function deleteProductHandler(req: Request<deleteProductInput['params']>, res: Response): Promise<Response<any, Record<string, any>>>;
