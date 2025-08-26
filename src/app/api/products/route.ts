import { NextRequest, NextResponse } from 'next/server';
import { ProductsSchema, ApiErrorSchema, safeParse } from '@/lib/schemas';

// Mock product data for ISR demo
const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.5,
    reviews: 1247,
    image: "/next.svg",
    category: "Electronics",
    inStock: true,
    discount: 20,
    description: "Premium quality wireless headphones with noise cancellation and 30-hour battery life."
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.7,
    reviews: 892,
    image: "/next.svg",
    category: "Wearables",
    inStock: true,
    discount: 20,
    description: "Track your health and fitness with advanced sensors and GPS functionality."
  },
  {
    id: 3,
    name: "Mechanical Gaming Keyboard",
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.8,
    reviews: 2156,
    image: "/next.svg",
    category: "Gaming",
    inStock: false,
    discount: 19,
    description: "RGB backlit mechanical keyboard with customizable switches and macro support."
  },
  {
    id: 4,
    name: "4K Webcam",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.3,
    reviews: 567,
    image: "/next.svg",
    category: "Electronics",
    inStock: true,
    discount: 25,
    description: "Ultra HD webcam perfect for streaming, video calls, and content creation."
  },
  {
    id: 5,
    name: "Portable Power Bank",
    price: 34.99,
    originalPrice: 49.99,
    rating: 4.6,
    reviews: 1834,
    image: "/next.svg",
    category: "Accessories",
    inStock: true,
    discount: 30,
    description: "20,000mAh portable charger with fast charging and multiple device support."
  },
  {
    id: 6,
    name: "Wireless Mouse",
    price: 24.99,
    originalPrice: 34.99,
    rating: 4.2,
    reviews: 743,
    image: "/next.svg",
    category: "Electronics",
    inStock: true,
    discount: 29,
    description: "Ergonomic wireless mouse with precision tracking and long battery life."
  }
];

export async function GET(request: NextRequest) {
  try {
    // Simulate API delay for realistic demo
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Add dynamic data for ISR demo
    const productsWithDynamicData = products.map(product => ({
      ...product,
      // Simulate dynamic stock levels
      stockLevel: Math.floor(Math.random() * 100) + 1,
      // Simulate recent activity
      lastUpdated: new Date().toISOString()
    }));

    const validation = safeParse(ProductsSchema, productsWithDynamicData);
    
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Validation Error',
          message: 'Products data failed validation',
          details: validation.error,
          timestamp: new Date().toISOString(),
          success: false
        } satisfies Parameters<typeof ApiErrorSchema.parse>[0],
        { status: 500 }
      );
    }

    return NextResponse.json(validation.data, {
      headers: {
        'Cache-Control': 's-maxage=60, stale-while-revalidate=120',
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: 'Failed to fetch products data',
        timestamp: new Date().toISOString(),
        success: false
      } satisfies Parameters<typeof ApiErrorSchema.parse>[0],
      { status: 500 }
    );
  }
}