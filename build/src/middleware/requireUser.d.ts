import { NextFunction, Request, Response } from 'express';
declare const requireUser: (req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
export default requireUser;
