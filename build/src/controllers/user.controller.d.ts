import { Request, Response } from 'express';
import { CreateUserInput } from '../schema/user.schema';
declare function createUserHandler(req: Request<{}, {}, CreateUserInput['body']>, res: Response): Promise<Response<any, Record<string, any>>>;
declare const _default: {
    createUserHandler: typeof createUserHandler;
};
export default _default;
