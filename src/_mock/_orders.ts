// Mock data for orders

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentMethod: string;
  shippingAddress: Address;
  billingAddress: Address;
  createdAt: string;
  updatedAt: string;
  deliveryDate?: string;
  trackingNumber?: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  variantId: string;
  variantName: string;
  color: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Address {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export type OrderStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'processing' 
  | 'shipped' 
  | 'delivered' 
  | 'cancelled' 
  | 'refunded';

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
  refunded: 'Refunded',
};

// Mock Orders
export const ORDERS: Order[] = [
  {
    id: 'order-001',
    orderNumber: 'ORD-2024-001234',
    userId: 'user-001',
    items: [
      {
        id: 'item-001',
        productId: 'prod-001',
        productName: 'iPhone 15 Pro Max',
        productImage: '/assets/images/product/product-1.webp',
        variantId: 'var-001-1',
        variantName: '256GB',
        color: 'Natural Titanium',
        quantity: 1,
        price: 1199,
        total: 1199,
      },
      {
        id: 'item-002',
        productId: 'prod-007',
        productName: 'AirPods Pro (2nd Gen)',
        productImage: '/assets/images/product/product-1.webp',
        variantId: 'var-007-1',
        variantName: 'Standard',
        color: 'White',
        quantity: 1,
        price: 249,
        total: 249,
      },
    ],
    subtotal: 1448,
    shipping: 0,
    tax: 115.84,
    discount: 50,
    total: 1513.84,
    status: 'delivered',
    paymentMethod: 'Credit Card (**** 4242)',
    shippingAddress: {
      fullName: 'John Smith',
      phone: '+1 (555) 123-4567',
      email: 'john.smith@example.com',
      addressLine1: '123 Main Street',
      addressLine2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
    },
    billingAddress: {
      fullName: 'John Smith',
      phone: '+1 (555) 123-4567',
      email: 'john.smith@example.com',
      addressLine1: '123 Main Street',
      addressLine2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
    },
    createdAt: '2024-09-15T10:30:00Z',
    updatedAt: '2024-09-20T14:45:00Z',
    deliveryDate: '2024-09-20',
    trackingNumber: 'TRK123456789',
  },
  {
    id: 'order-002',
    orderNumber: 'ORD-2024-001235',
    userId: 'user-001',
    items: [
      {
        id: 'item-003',
        productId: 'prod-006',
        productName: 'Apple Watch Series 9',
        productImage: '/assets/images/product/product-21.webp',
        variantId: 'var-006-3',
        variantName: '45mm GPS',
        color: 'Midnight',
        quantity: 1,
        price: 429,
        total: 429,
      },
    ],
    subtotal: 429,
    shipping: 0,
    tax: 34.32,
    discount: 0,
    total: 463.32,
    status: 'shipped',
    paymentMethod: 'PayPal',
    shippingAddress: {
      fullName: 'John Smith',
      phone: '+1 (555) 123-4567',
      email: 'john.smith@example.com',
      addressLine1: '123 Main Street',
      addressLine2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
    },
    billingAddress: {
      fullName: 'John Smith',
      phone: '+1 (555) 123-4567',
      email: 'john.smith@example.com',
      addressLine1: '123 Main Street',
      addressLine2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
    },
    createdAt: '2024-10-01T15:20:00Z',
    updatedAt: '2024-10-05T09:15:00Z',
    trackingNumber: 'TRK987654321',
  },
  {
    id: 'order-003',
    orderNumber: 'ORD-2024-001236',
    userId: 'user-001',
    items: [
      {
        id: 'item-004',
        productId: 'prod-002',
        productName: 'Samsung Galaxy S24 Ultra',
        productImage: '/assets/images/product/product-5.webp',
        variantId: 'var-002-2',
        variantName: '512GB / 12GB RAM',
        color: 'Titanium Gray',
        quantity: 1,
        price: 1299,
        total: 1299,
      },
    ],
    subtotal: 1299,
    shipping: 0,
    tax: 103.92,
    discount: 0,
    total: 1402.92,
    status: 'processing',
    paymentMethod: 'Credit Card (**** 4242)',
    shippingAddress: {
      fullName: 'John Smith',
      phone: '+1 (555) 123-4567',
      email: 'john.smith@example.com',
      addressLine1: '123 Main Street',
      addressLine2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
    },
    billingAddress: {
      fullName: 'John Smith',
      phone: '+1 (555) 123-4567',
      email: 'john.smith@example.com',
      addressLine1: '123 Main Street',
      addressLine2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
    },
    createdAt: '2024-10-12T11:45:00Z',
    updatedAt: '2024-10-13T08:30:00Z',
  },
];

// Get orders for user
export function getUserOrders(userId: string): Order[] {
  return ORDERS.filter((order) => order.userId === userId).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

// Get order by ID
export function getOrderById(orderId: string): Order | undefined {
  return ORDERS.find((order) => order.id === orderId);
}

// Get order by order number
export function getOrderByNumber(orderNumber: string): Order | undefined {
  return ORDERS.find((order) => order.orderNumber === orderNumber);
}

