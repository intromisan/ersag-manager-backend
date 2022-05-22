import { Express } from 'express';
import { getUserFinanceHandler } from './controllers/finance.controller';
import { addItemToInventoryHandler, getUserInventoryHandler, removeItemFromInventoryHandler } from './controllers/inventory.controller';
import { createProductHandler, deleteProductHandler, getAllProductsHandler, getProductHandler, updateProductHandler } from './controllers/product.controller';
import { createUserSessionHandler, deleteSessionHandler, getUserSessionHandler } from './controllers/session.controller';
import userController from './controllers/user.controller';
import requireUser from './middleware/requireUser';
import validate from './middleware/validateResource';
import { addItemToInventorySchema } from './schema/inventory.schema';
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from './schema/product.schema';
import { createSessionSchema } from './schema/session.schema';
import { createUserSchema } from './schema/user.schema';

function routes(app: Express) {
  app.get('/api/healthcheck', (req, res) => res.status(200).send({ message: 'Healthy' }));

  // Users
  app.post('/api/users', validate(createUserSchema), userController.createUserHandler);

  // Session
  app.post('/api/sessions', validate(createSessionSchema), createUserSessionHandler);
  app.get('/api/sessions', requireUser, getUserSessionHandler);
  app.delete('/api/sessions', requireUser, deleteSessionHandler);

  // Products
  app.post('/api/products', [requireUser, validate(createProductSchema)], createProductHandler);
  app.put('/api/products/:productId', [requireUser, validate(updateProductSchema)], updateProductHandler);
  app.get('/api/products/:productId', [requireUser, validate(getProductSchema)], getProductHandler);
  app.get('/api/products', requireUser, getAllProductsHandler);
  app.delete('/api/products/:productId', [requireUser, validate(deleteProductSchema)], deleteProductHandler);

  // Inventory
  app.get('/api/userInventory', requireUser, getUserInventoryHandler);
  app.patch('/api/userInventory/addItem', [requireUser, validate(addItemToInventorySchema)], addItemToInventoryHandler);
  app.patch(`/api/userInventory/removeItem`, requireUser, removeItemFromInventoryHandler);

  // User Finance
  app.get('/api/finance', requireUser, getUserFinanceHandler);
}

export default routes;
