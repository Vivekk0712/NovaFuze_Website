import axios from 'axios';

const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:4000';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export interface PaymentOrder {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
}

export interface CreateOrderRequest {
  amount: number;
  currency?: string;
  productName?: string;
}

export interface CreateOrderResponse {
  success: boolean;
  order: PaymentOrder;
  key: string;
}

export interface VerifyPaymentRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface VerifyPaymentResponse {
  success: boolean;
  message: string;
  purchase: {
    productName: string;
    amount: number;
    currency: string;
    purchaseDate: string;
  };
}

export interface PurchaseStatus {
  success: boolean;
  hasPurchased: boolean;
  purchases: Array<{
    productName: string;
    amount: number;
    currency: string;
    purchaseDate: string;
    status: string;
  }>;
  lastPayment?: {
    amount: number;
    currency: string;
    productName: string;
    date: string;
  };
}

export interface PaymentHistory {
  success: boolean;
  payments: Array<{
    id: string;
    orderId: string;
    amount: number;
    currency: string;
    planType: string;
    status: string;
    createdAt: string;
    completedAt?: string;
    paymentId?: string;
  }>;
}

// Create payment order
export const createPaymentOrder = async (data: CreateOrderRequest): Promise<CreateOrderResponse> => {
  const response = await api.post('/api/payment/create-order', data);
  return response.data;
};

// Verify payment
export const verifyPayment = async (data: VerifyPaymentRequest): Promise<VerifyPaymentResponse> => {
  const response = await api.post('/api/payment/verify-payment', data);
  return response.data;
};

// Get purchase status
export const getPurchaseStatus = async (): Promise<PurchaseStatus> => {
  const response = await api.get('/api/payment/purchase-status');
  return response.data;
};

// Get payment history
export const getPaymentHistory = async (): Promise<PaymentHistory> => {
  const response = await api.get('/api/payment/payment-history');
  return response.data;
};

// Razorpay payment handler
export const handleRazorpayPayment = (
  order: PaymentOrder,
  razorpayKey: string,
  userDetails: { name?: string; email?: string; contact?: string },
  productName: string,
  onSuccess: (response: any) => void,
  onError: (error: any) => void
) => {
  const options = {
    key: razorpayKey,
    amount: order.amount,
    currency: order.currency,
    name: 'NovaFuze-Tech',
    description: `Purchase ${productName}`,
    order_id: order.id,
    prefill: {
      name: userDetails.name || '',
      email: userDetails.email || '',
      contact: userDetails.contact || '',
    },
    theme: {
      color: '#7c3aed',
    },
    handler: function (response: any) {
      onSuccess(response);
    },
    modal: {
      ondismiss: function () {
        onError({ message: 'Payment cancelled by user' });
      },
    },
  };

  // Check if Razorpay is loaded
  if (typeof (window as any).Razorpay !== 'undefined') {
    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  } else {
    onError({ message: 'Razorpay SDK not loaded' });
  }
};

// Test email endpoint (for debugging)
export const testEmail = async (): Promise<{ success: boolean; message: string }> => {
  const response = await api.post('/api/payment/test-email');
  return response.data;
};