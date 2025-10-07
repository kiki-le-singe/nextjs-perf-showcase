"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeParse = exports.ApiErrorSchema = exports.BlogPostsSchema = exports.ProductsSchema = exports.BlogPostSchema = exports.ProductSchema = exports.DashboardSchema = exports.UserSchema = void 0;
const zod_1 = require("zod");
exports.UserSchema = zod_1.z.object({
    id: zod_1.z.number().positive(),
    name: zod_1.z.string().min(1, 'Name is required').max(100),
    email: zod_1.z.email('Invalid email format'),
    avatar: zod_1.z.url('Avatar must be a valid URL').or(zod_1.z
        .string()
        .startsWith('/')
        .transform(url => url)),
    role: zod_1.z.enum(['Premium User', 'Basic User', 'Admin', 'Guest']),
    joinDate: zod_1.z.iso.date('Invalid date format'),
    lastLogin: zod_1.z.iso.datetime('Invalid datetime format'),
    preferences: zod_1.z.object({
        theme: zod_1.z.enum(['light', 'dark', 'system']),
        notifications: zod_1.z.boolean(),
        language: zod_1.z.string().min(2).max(5),
    }),
});
const ActivityItemSchema = zod_1.z.object({
    id: zod_1.z.number().positive(),
    type: zod_1.z.enum(['order', 'payment', 'support', 'notification', 'system']),
    message: zod_1.z.string().min(1).max(500),
    time: zod_1.z.iso.datetime(),
    status: zod_1.z.enum(['success', 'pending', 'info', 'warning', 'error']),
});
const NotificationSchema = zod_1.z.object({
    id: zod_1.z.number().positive(),
    title: zod_1.z.string().min(1).max(100),
    message: zod_1.z.string().min(1).max(500),
    type: zod_1.z.enum(['info', 'warning', 'error', 'success']),
    unread: zod_1.z.boolean(),
});
const StatsSchema = zod_1.z.object({
    totalOrders: zod_1.z.number().nonnegative(),
    revenue: zod_1.z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid revenue format'),
    activeSubscriptions: zod_1.z.number().nonnegative(),
    supportTickets: zod_1.z.number().nonnegative(),
});
exports.DashboardSchema = zod_1.z.object({
    stats: StatsSchema,
    recentActivity: zod_1.z.array(ActivityItemSchema).max(50),
    notifications: zod_1.z.array(NotificationSchema).max(20),
    currentTime: zod_1.z.iso.datetime(),
    serverLocation: zod_1.z.string().min(1),
});
exports.ProductSchema = zod_1.z.object({
    id: zod_1.z.number().positive(),
    name: zod_1.z.string().min(1).max(200),
    price: zod_1.z.number().positive(),
    originalPrice: zod_1.z.number().positive(),
    rating: zod_1.z.number().min(0).max(5),
    reviews: zod_1.z.number().nonnegative(),
    image: zod_1.z.url().or(zod_1.z.string().startsWith('/')),
    category: zod_1.z.string().min(1),
    inStock: zod_1.z.boolean(),
    discount: zod_1.z.number().min(0).max(100),
    description: zod_1.z.string().min(1).max(1000),
    stockLevel: zod_1.z.number().nonnegative().optional(),
    lastUpdated: zod_1.z.iso.datetime().optional(),
});
exports.BlogPostSchema = zod_1.z.object({
    id: zod_1.z.number().positive(),
    title: zod_1.z.string().min(1).max(200),
    excerpt: zod_1.z.string().min(1).max(500),
    author: zod_1.z.string().min(1).max(100),
    date: zod_1.z.iso.date(),
    readTime: zod_1.z.string().regex(/^\d+\s+min\s+read$/, 'Invalid read time format'),
    category: zod_1.z.string().min(1).max(50),
    tags: zod_1.z.array(zod_1.z.string().min(1).max(30)).max(10),
});
exports.ProductsSchema = zod_1.z.array(exports.ProductSchema);
exports.BlogPostsSchema = zod_1.z.array(exports.BlogPostSchema);
exports.ApiErrorSchema = zod_1.z.object({
    error: zod_1.z.string(),
    message: zod_1.z.string(),
    details: zod_1.z.record(zod_1.z.string(), zod_1.z.unknown()).optional(),
    timestamp: zod_1.z.iso.datetime(),
    success: zod_1.z.literal(false),
});
const safeParse = (schema, data) => {
    try {
        return {
            success: true,
            data: schema.parse(data),
        };
    }
    catch (error) {
        return {
            success: false,
            error: error instanceof zod_1.z.ZodError ? error.format() : 'Unknown validation error',
        };
    }
};
exports.safeParse = safeParse;
//# sourceMappingURL=schemas.js.map