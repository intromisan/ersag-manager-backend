import { array, boolean, number, object, string, TypeOf } from 'zod';

const payload = {
  body: object({
    userId: string({ required_error: 'User ID is required' }),
    products: object({
      product: string({ required_error: 'Product ID is required' }),
      itemAmount: number({ required_error: 'Amount is required' })
    }).array()
  })
};

const addItemPayload = {
  body: object({
    productId: string({ required_error: 'Product ID is required' }),
    itemAmount: number({ required_error: 'Item Amount is required' }),
    isPresent: boolean().default(false)
  })
};

const removeItemPayload = {
  body: object({
    productId: string({ required_error: 'Product ID is required' }),
    itemAmount: number({ required_error: 'Item Amount is required' }),
    isPresent: boolean().default(false),
    isDelete: boolean().default(false)
  })
};

export const createUserInventorySchema = object({
  ...payload
});
export const addItemToInventorySchema = object({
  ...addItemPayload
});
export const removeItemFromInventorySchema = object({
  ...removeItemPayload
});

export type createUserInventoryInput = TypeOf<typeof createUserInventorySchema>;
export type addItemToInventoryInput = TypeOf<typeof addItemToInventorySchema>;
export type removeItemFromInventoryInput = TypeOf<typeof removeItemFromInventorySchema>;
