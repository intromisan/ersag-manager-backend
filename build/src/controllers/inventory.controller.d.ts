import { Request, Response } from 'express';
import { addItemToInventoryInput, removeItemFromInventoryInput } from '../schema/inventory.schema';
export declare function getUserInventoryHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function addItemToInventoryHandler(req: Request<{}, {}, addItemToInventoryInput['body']>, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function removeItemFromInventoryHandler(req: Request<{}, {}, removeItemFromInventoryInput['body']>, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
