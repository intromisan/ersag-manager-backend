import { TypeOf } from 'zod';
export declare const createUserInventorySchema: import("zod").ZodObject<{
    body: import("zod").ZodObject<{
        userId: import("zod").ZodString;
        products: import("zod").ZodArray<import("zod").ZodObject<{
            product: import("zod").ZodString;
            itemAmount: import("zod").ZodNumber;
        }, "strip", import("zod").ZodTypeAny, {
            product: string;
            itemAmount: number;
        }, {
            product: string;
            itemAmount: number;
        }>, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        userId: string;
        products: {
            product: string;
            itemAmount: number;
        }[];
    }, {
        userId: string;
        products: {
            product: string;
            itemAmount: number;
        }[];
    }>;
}, "strip", import("zod").ZodTypeAny, {
    body: {
        userId: string;
        products: {
            product: string;
            itemAmount: number;
        }[];
    };
}, {
    body: {
        userId: string;
        products: {
            product: string;
            itemAmount: number;
        }[];
    };
}>;
export declare const addItemToInventorySchema: import("zod").ZodObject<{
    body: import("zod").ZodObject<{
        productId: import("zod").ZodString;
        itemAmount: import("zod").ZodNumber;
        isPresent: import("zod").ZodDefault<import("zod").ZodBoolean>;
    }, "strip", import("zod").ZodTypeAny, {
        itemAmount: number;
        productId: string;
        isPresent: boolean;
    }, {
        isPresent?: boolean | undefined;
        itemAmount: number;
        productId: string;
    }>;
}, "strip", import("zod").ZodTypeAny, {
    body: {
        itemAmount: number;
        productId: string;
        isPresent: boolean;
    };
}, {
    body: {
        isPresent?: boolean | undefined;
        itemAmount: number;
        productId: string;
    };
}>;
export declare const removeItemFromInventorySchema: import("zod").ZodObject<{
    body: import("zod").ZodObject<{
        productId: import("zod").ZodString;
        itemAmount: import("zod").ZodNumber;
        isPresent: import("zod").ZodDefault<import("zod").ZodBoolean>;
        isDelete: import("zod").ZodDefault<import("zod").ZodBoolean>;
    }, "strip", import("zod").ZodTypeAny, {
        itemAmount: number;
        productId: string;
        isPresent: boolean;
        isDelete: boolean;
    }, {
        isPresent?: boolean | undefined;
        isDelete?: boolean | undefined;
        itemAmount: number;
        productId: string;
    }>;
}, "strip", import("zod").ZodTypeAny, {
    body: {
        itemAmount: number;
        productId: string;
        isPresent: boolean;
        isDelete: boolean;
    };
}, {
    body: {
        isPresent?: boolean | undefined;
        isDelete?: boolean | undefined;
        itemAmount: number;
        productId: string;
    };
}>;
export declare type createUserInventoryInput = TypeOf<typeof createUserInventorySchema>;
export declare type addItemToInventoryInput = TypeOf<typeof addItemToInventorySchema>;
export declare type removeItemFromInventoryInput = TypeOf<typeof removeItemFromInventorySchema>;
