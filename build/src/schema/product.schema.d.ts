import { TypeOf } from 'zod';
export declare const createProductSchema: import("zod").ZodObject<{
    body: import("zod").ZodObject<{
        name: import("zod").ZodString;
        code: import("zod").ZodString;
        volume: import("zod").ZodString;
        price: import("zod").ZodNumber;
        withDevice: import("zod").ZodBoolean;
        image: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        name: string;
        code: string;
        volume: string;
        price: number;
        image: string;
        withDevice: boolean;
    }, {
        name: string;
        code: string;
        volume: string;
        price: number;
        image: string;
        withDevice: boolean;
    }>;
}, "strip", import("zod").ZodTypeAny, {
    body: {
        name: string;
        code: string;
        volume: string;
        price: number;
        image: string;
        withDevice: boolean;
    };
}, {
    body: {
        name: string;
        code: string;
        volume: string;
        price: number;
        image: string;
        withDevice: boolean;
    };
}>;
export declare const updateProductSchema: import("zod").ZodObject<{
    params: import("zod").ZodObject<{
        productId: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        productId: string;
    }, {
        productId: string;
    }>;
    body: import("zod").ZodObject<{
        name: import("zod").ZodString;
        code: import("zod").ZodString;
        volume: import("zod").ZodString;
        price: import("zod").ZodNumber;
        withDevice: import("zod").ZodBoolean;
        image: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        name: string;
        code: string;
        volume: string;
        price: number;
        image: string;
        withDevice: boolean;
    }, {
        name: string;
        code: string;
        volume: string;
        price: number;
        image: string;
        withDevice: boolean;
    }>;
}, "strip", import("zod").ZodTypeAny, {
    params: {
        productId: string;
    };
    body: {
        name: string;
        code: string;
        volume: string;
        price: number;
        image: string;
        withDevice: boolean;
    };
}, {
    params: {
        productId: string;
    };
    body: {
        name: string;
        code: string;
        volume: string;
        price: number;
        image: string;
        withDevice: boolean;
    };
}>;
export declare const deleteProductSchema: import("zod").ZodObject<{
    params: import("zod").ZodObject<{
        productId: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        productId: string;
    }, {
        productId: string;
    }>;
}, "strip", import("zod").ZodTypeAny, {
    params: {
        productId: string;
    };
}, {
    params: {
        productId: string;
    };
}>;
export declare const getProductSchema: import("zod").ZodObject<{
    params: import("zod").ZodObject<{
        productId: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        productId: string;
    }, {
        productId: string;
    }>;
}, "strip", import("zod").ZodTypeAny, {
    params: {
        productId: string;
    };
}, {
    params: {
        productId: string;
    };
}>;
export declare type createProductInput = TypeOf<typeof createProductSchema>;
export declare type updateProductInput = TypeOf<typeof updateProductSchema>;
export declare type deleteProductInput = TypeOf<typeof deleteProductSchema>;
export declare type readProductInput = TypeOf<typeof getProductSchema>;
