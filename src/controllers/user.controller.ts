import { Request, Response } from 'express';
import { omit } from 'lodash';

import logger from '../utils/logger';
import { CreateUserInput } from '../schema/user.schema';
import { createUser } from '../service/user.service';
import { createUserInventory } from '../service/inventory.service';
import { createUserFinance } from '../service/finance.service';

async function createUserHandler(req: Request<{}, {}, CreateUserInput['body']>, res: Response) {
  try {
    const user = await createUser(req.body); // call create user service
    await createUserInventory({
      userId: user.id,
      products: []
    });
    await createUserFinance({
      userId: user.id,
      balance: 0,
      discountPercentage: 0,
      inventoryTotalValue: 0
    });
    return res.status(201).send(omit(user, 'password'));
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

export default {
  createUserHandler
};
