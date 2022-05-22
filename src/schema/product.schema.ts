import { object, number, string, boolean, TypeOf } from 'zod';

const payload = {
  body: object({
    name: string({ required_error: 'Name is required' }),
    code: string({ required_error: 'Code is required' }),
    volume: string({ required_error: 'Volume is required' }),
    price: number({ required_error: 'Price is required' }),
    withDevice: boolean({ required_error: 'Price is required' }),
    image: string()
  })
};

const params = {
  params: object({
    productId: string({
      required_error: 'productId is required'
    })
  })
};

export const createProductSchema = object({
  ...payload
});

export const updateProductSchema = object({
  ...payload,
  ...params
});

export const deleteProductSchema = object({
  ...params
});

export const getProductSchema = object({
  ...params
});

export type createProductInput = TypeOf<typeof createProductSchema>;
export type updateProductInput = TypeOf<typeof updateProductSchema>;
export type deleteProductInput = TypeOf<typeof deleteProductSchema>;
export type readProductInput = TypeOf<typeof getProductSchema>;
