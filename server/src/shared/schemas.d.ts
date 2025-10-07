import { z } from 'zod';
export declare const UserSchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    email: z.ZodEmail;
    avatar: z.ZodUnion<[z.ZodURL, z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>]>;
    role: z.ZodEnum<{
        "Premium User": "Premium User";
        "Basic User": "Basic User";
        Admin: "Admin";
        Guest: "Guest";
    }>;
    joinDate: z.ZodISODate;
    lastLogin: z.ZodISODateTime;
    preferences: z.ZodObject<{
        theme: z.ZodEnum<{
            light: "light";
            dark: "dark";
            system: "system";
        }>;
        notifications: z.ZodBoolean;
        language: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const DashboardSchema: z.ZodObject<{
    stats: z.ZodObject<{
        totalOrders: z.ZodNumber;
        revenue: z.ZodString;
        activeSubscriptions: z.ZodNumber;
        supportTickets: z.ZodNumber;
    }, z.core.$strip>;
    recentActivity: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        type: z.ZodEnum<{
            notification: "notification";
            system: "system";
            order: "order";
            payment: "payment";
            support: "support";
        }>;
        message: z.ZodString;
        time: z.ZodISODateTime;
        status: z.ZodEnum<{
            info: "info";
            error: "error";
            success: "success";
            pending: "pending";
            warning: "warning";
        }>;
    }, z.core.$strip>>;
    notifications: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        title: z.ZodString;
        message: z.ZodString;
        type: z.ZodEnum<{
            info: "info";
            error: "error";
            success: "success";
            warning: "warning";
        }>;
        unread: z.ZodBoolean;
    }, z.core.$strip>>;
    currentTime: z.ZodISODateTime;
    serverLocation: z.ZodString;
}, z.core.$strip>;
export declare const ProductSchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    price: z.ZodNumber;
    originalPrice: z.ZodNumber;
    rating: z.ZodNumber;
    reviews: z.ZodNumber;
    image: z.ZodUnion<[z.ZodURL, z.ZodString]>;
    category: z.ZodString;
    inStock: z.ZodBoolean;
    discount: z.ZodNumber;
    description: z.ZodString;
    stockLevel: z.ZodOptional<z.ZodNumber>;
    lastUpdated: z.ZodOptional<z.ZodISODateTime>;
}, z.core.$strip>;
export declare const BlogPostSchema: z.ZodObject<{
    id: z.ZodNumber;
    title: z.ZodString;
    excerpt: z.ZodString;
    author: z.ZodString;
    date: z.ZodISODate;
    readTime: z.ZodString;
    category: z.ZodString;
    tags: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
export declare const ProductsSchema: z.ZodArray<z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    price: z.ZodNumber;
    originalPrice: z.ZodNumber;
    rating: z.ZodNumber;
    reviews: z.ZodNumber;
    image: z.ZodUnion<[z.ZodURL, z.ZodString]>;
    category: z.ZodString;
    inStock: z.ZodBoolean;
    discount: z.ZodNumber;
    description: z.ZodString;
    stockLevel: z.ZodOptional<z.ZodNumber>;
    lastUpdated: z.ZodOptional<z.ZodISODateTime>;
}, z.core.$strip>>;
export declare const BlogPostsSchema: z.ZodArray<z.ZodObject<{
    id: z.ZodNumber;
    title: z.ZodString;
    excerpt: z.ZodString;
    author: z.ZodString;
    date: z.ZodISODate;
    readTime: z.ZodString;
    category: z.ZodString;
    tags: z.ZodArray<z.ZodString>;
}, z.core.$strip>>;
export declare const ApiErrorSchema: z.ZodObject<{
    error: z.ZodString;
    message: z.ZodString;
    details: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    timestamp: z.ZodISODateTime;
    success: z.ZodLiteral<false>;
}, z.core.$strip>;
export declare const safeParse: <T>(schema: z.ZodSchema<T>, data: unknown) => {
    success: true;
    data: T;
    error?: undefined;
} | {
    success: false;
    error: string | z.core.$ZodFormattedError<unknown, string>;
    data?: undefined;
};
