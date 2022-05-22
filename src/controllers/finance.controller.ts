import { Request, Response } from 'express';
import { findUserFinance } from '../service/finance.service';

export async function getUserFinanceHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  try {
    const userFinance = await findUserFinance({ userId });

    if (!userFinance) return res.status(500);

    return res.status(200).send(userFinance);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}
