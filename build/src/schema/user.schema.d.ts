import { TypeOf } from 'zod';
export declare const createUserSchema: import("zod").ZodObject<{
    body: import("zod").ZodEffects<import("zod").ZodObject<{
        name: import("zod").ZodString;
        password: import("zod").ZodString;
        passwordConfirmation: import("zod").ZodString;
        email: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        name: string;
        email: string;
        password: string;
        passwordConfirmation: string;
    }, {
        name: string;
        email: string;
        password: string;
        passwordConfirmation: string;
    }>, {
        name: string;
        email: string;
        password: string;
        passwordConfirmation: string;
    }, {
        name: string;
        email: string;
        password: string;
        passwordConfirmation: string;
    }>;
}, "strip", import("zod").ZodTypeAny, {
    body: {
        name: string;
        email: string;
        password: string;
        passwordConfirmation: string;
    };
}, {
    body: {
        name: string;
        email: string;
        password: string;
        passwordConfirmation: string;
    };
}>;
export declare type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, 'body.passwordConfirmation'>;
