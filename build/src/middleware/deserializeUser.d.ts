import { NextFunction, Request, Response } from 'express';
declare const deserializeUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export default deserializeUser;
