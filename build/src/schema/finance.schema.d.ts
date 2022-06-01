import { TypeOf } from 'zod';
export declare const createUserFinanceSchema: import("zod").ZodObject<{
    body: import("zod").ZodObject<{
        userId: import("zod").ZodString;
        balance: import("zod").ZodNumber;
        discountPercentage: import("zod").ZodNumber;
        inventoryTotalValue: import("zod").ZodNumber;
    }, "strip", import("zod").ZodTypeAny, {
        userId: string;
        balance: number;
        discountPercentage: number;
        inventoryTotalValue: number;
    }, {
        userId: string;
        balance: number;
        discountPercentage: number;
        inventoryTotalValue: number;
    }>;
}, "strip", import("zod").ZodTypeAny, {
    body: {
        userId: string;
        balance: number;
        discountPercentage: number;
        inventoryTotalValue: number;
    };
}, {
    body: {
        userId: string;
        balance: number;
        discountPercentage: number;
        inventoryTotalValue: number;
    };
}>;
export declare type createUserFinanceInput = TypeOf<typeof createUserFinanceSchema>;
