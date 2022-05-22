import { Request, Response } from 'express';
import { omit } from 'lodash';
import { addItemToInventoryInput, createUserInventoryInput, removeItemFromInventoryInput } from '../schema/inventory.schema';
import { findUserFinance, updateInventoryTotalValue, updateUserBalance, updateUserFinance } from '../service/finance.service';
import { updateUserInventory, findPopulatedUserInventory, findUserInventory } from '../service/inventory.service';
import { findProduct } from '../service/product.service';
import log from '../utils/logger';

// Get User Inventory
export async function getUserInventoryHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  try {
    const inventory = await findPopulatedUserInventory({ userId });

    return res.status(200).send(omit(inventory, 'userId'));
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
}

// Add new item to User Inventory
export async function addItemToInventoryHandler(req: Request<{}, {}, addItemToInventoryInput['body']>, res: Response) {
  const userId = res.locals.user._id;
  const { productId, itemAmount: queryItemAmount, isPresent } = req.body;

  try {
    // Find inventory, userFinance, Product
    const inventory = await findUserInventory({ userId });
    const userFinance = await findUserFinance({ userId });
    const product = await findProduct({ productId });

    if (!inventory || !userFinance) return res.status(500);

    if (!product) {
      return res.status(404).send('Product does not exist');
    }

    const { inventoryTotalValue, discountPercentage: userDiscount, balance: userBalance } = userFinance;

    let newInventoryProducts = inventory.products;

    // Find product, if not exists push, if exists change
    const inventoryItem = inventory.products.find((item) => product._id.equals(item.product));

    if (!inventoryItem) {
      newInventoryProducts.push({ product: product._id, itemAmount: queryItemAmount });
    } else {
      newInventoryProducts = newInventoryProducts.map((item) => (product._id.equals(item.product) ? { product: product._id, itemAmount: item.itemAmount + queryItemAmount } : item));
    }

    // Calculate new Inventory Total Value and new Balance
    const newInventoryTotalValue = inventoryTotalValue + product.price * queryItemAmount * (1 - userDiscount);
    const newBalance = userBalance - product.price * queryItemAmount * (1 - userDiscount);

    // If not present balance changes
    if (!isPresent) {
      await updateUserBalance({ userId }, newBalance, {});
    }

    // Total value inreases in any case
    await updateInventoryTotalValue({ userId }, newInventoryTotalValue, {});

    // Send to service the updated inventory
    const update = await updateUserInventory({ userId }, { userId, products: newInventoryProducts }, { new: true });

    return res.status(200).send(update);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
}

// Add new item to User Inventory
export async function removeItemFromInventoryHandler(req: Request<{}, {}, removeItemFromInventoryInput['body']>, res: Response) {
  const userId = res.locals.user._id;
  const { productId, itemAmount: queryItemAmount, isDelete, isPresent } = req.body;

  try {
    // Find inventory, userFinance, Product
    const inventory = await findUserInventory({ userId });
    const userFinance = await findUserFinance({ userId });
    const product = await findProduct({ productId });

    if (!inventory || !userFinance) return res.status(500);

    if (!product) {
      return res.status(404).send('Product does not exist');
    }

    // Find inventoryItem and if not exist return "Not exists" error
    const inventoryItem = inventory.products.find((item) => product._id.equals(item.product));

    if (!inventoryItem) {
      return res.status(404).send('Product is not in inventory');
    }

    // Check if remove item amount exceeds or equal to total amount of item in inventory
    if (queryItemAmount >= inventoryItem.itemAmount) {
      // Remove item from inventory
      const newInventoryProducts = inventory.products.filter((item) => !product._id.equals(item.product));

      if (isDelete) {
        // Balance increases and inventory total value decreases
        const newInventoryTotalValue = userFinance.inventoryTotalValue - inventoryItem.itemAmount * product.price * (1 - userFinance.discountPercentage);
        const newBalance = userFinance.balance + inventoryItem.itemAmount * product.price * (1 - userFinance.discountPercentage);
        await updateUserFinance({ userId }, { ...userFinance, inventoryTotalValue: newInventoryTotalValue, balance: newBalance }, {});
      } else {
        // If present, balance does not change, total value decreases
        const newInventoryTotalValue = userFinance.inventoryTotalValue - inventoryItem.itemAmount * product.price * (1 - userFinance.discountPercentage);
        const newBalance = userFinance.balance + product.price * inventoryItem.itemAmount * (1 - userFinance.discountPercentage);
        if (!isPresent) {
          await updateUserBalance({ userId }, newBalance, {});
        }
        await updateInventoryTotalValue({ userId }, newInventoryTotalValue, {});
      }

      const update = await updateUserInventory({ userId }, { userId, products: newInventoryProducts }, { new: true });
      return res.status(200).send(update);
    } else {
      // Find product and decrease by queryAmount
      const newInventoryProducts = inventory.products.map((item) => (product._id.equals(item.product) ? { product: product._id, itemAmount: item.itemAmount - queryItemAmount } : item));

      if (isDelete) {
        // Balance increases and inventory total value decreases
        const newInventoryTotalValue = userFinance.inventoryTotalValue - queryItemAmount * product.price * (1 - userFinance.discountPercentage);
        const newBalance = userFinance.balance + queryItemAmount * product.price * (1 - userFinance.discountPercentage);
        await updateUserFinance({ userId }, { ...userFinance, inventoryTotalValue: newInventoryTotalValue, balance: newBalance }, {});
      } else {
        // If present, balance does not change, total value decreases
        const newInventoryTotalValue = userFinance.inventoryTotalValue - queryItemAmount * product.price * (1 - userFinance.discountPercentage);
        const newBalance = userFinance.balance + product.price * queryItemAmount * (1 - userFinance.discountPercentage);
        if (!isPresent) {
          await updateUserBalance({ userId }, newBalance, {});
        }
        await updateInventoryTotalValue({ userId }, newInventoryTotalValue, {});
      }

      const update = await updateUserInventory({ userId }, { userId, products: newInventoryProducts }, { new: true });
      return res.status(200).send(update);
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}
