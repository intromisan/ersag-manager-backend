import { number, object, string, TypeOf } from 'zod';

const payload = {
  body: object({
    userId: string({ required_error: 'User ID is required' }),
    balance: number(),
    discountPercentage: number(),
    inventoryTotalValue: number()
  })
};

export const createUserFinanceSchema = object({
  ...payload
});

export type createUserFinanceInput = TypeOf<typeof createUserFinanceSchema>;
