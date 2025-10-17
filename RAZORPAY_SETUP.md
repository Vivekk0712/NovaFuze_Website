# Razorpay Payment Integration Setup

This guide will help you set up Razorpay payment integration in your NovaFuze-Tech application.

## Prerequisites

1. A Razorpay account (create one at [razorpay.com](https://razorpay.com))
2. Node.js and npm installed
3. Your application running locally

## Step 1: Create Razorpay Account

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Sign up for a new account or log in
3. Complete the KYC process (for live mode)
4. For testing, you can use Test Mode immediately

## Step 2: Get API Keys

1. In the Razorpay Dashboard, go to **Settings** > **API Keys**
2. Generate API Keys for Test Mode
3. Copy the **Key ID** and **Key Secret**

## Step 3: Configure Environment Variables

Update your `backend/.env` file with your Razorpay credentials:

```env
# Razorpay Configuration (Test Mode)
RAZORPAY_KEY_ID=rzp_test_your_key_id_here
RAZORPAY_KEY_SECRET=your_key_secret_here
```

**Important:** 
- Never commit your actual API keys to version control
- Use Test Mode keys for development
- Switch to Live Mode keys only for production

## Step 4: Install Dependencies

The Razorpay dependency should already be installed, but if not:

```bash
cd backend
npm install razorpay
```

## Step 5: Test the Integration

1. Start your backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start your frontend:
   ```bash
   cd NovaFuze_web
   npm run dev
   ```

3. Navigate to the Products section
4. Click "Get Started" on the LiveEazy product (₹799/month)
5. You'll be redirected to the payment page
6. Click "Pay ₹799" to test the payment flow

## Test Payment Details

For testing in Razorpay Test Mode, use these test card details:

### Test Cards
- **Card Number:** 4111 1111 1111 1111
- **Expiry:** Any future date (e.g., 12/25)
- **CVV:** Any 3 digits (e.g., 123)
- **Name:** Any name

### Test UPI
- **UPI ID:** success@razorpay
- **UPI ID (Failure):** failure@razorpay

### Test Netbanking
- Select any bank and use the test credentials provided by Razorpay

## Payment Flow

1. **Product Selection:** User clicks "Get Started" on LiveEazy product
2. **Payment Page:** User is redirected to `/payment` page
3. **Order Creation:** Frontend calls backend to create Razorpay order
4. **Payment Gateway:** Razorpay checkout opens with payment options
5. **Payment Processing:** User completes payment using test credentials
6. **Verification:** Backend verifies payment signature
7. **Subscription Activation:** User subscription is activated in Firestore
8. **Confirmation:** User sees success message and subscription status

## Database Schema

The integration creates these collections in Firestore:

### payment_orders
```javascript
{
  orderId: "order_xyz123",
  userId: "firebase_uid",
  amount: 799,
  currency: "INR",
  planType: "monthly",
  status: "completed",
  createdAt: "2024-01-01T00:00:00Z",
  completedAt: "2024-01-01T00:05:00Z",
  paymentId: "pay_abc123",
  signature: "signature_hash"
}
```

### users (updated with subscription info)
```javascript
{
  // ... existing user fields
  subscription: {
    status: "active",
    planType: "monthly",
    startDate: "2024-01-01T00:00:00Z",
    endDate: "2024-02-01T00:00:00Z",
    amount: 799,
    currency: "INR",
    paymentId: "pay_abc123",
    orderId: "order_xyz123"
  },
  lastPayment: {
    amount: 799,
    currency: "INR",
    paymentId: "pay_abc123",
    orderId: "order_xyz123",
    date: "2024-01-01T00:00:00Z"
  }
}
```

## API Endpoints

### POST /api/payment/create-order
Creates a new payment order
- **Body:** `{ amount: 799, currency: "INR", planType: "monthly" }`
- **Response:** `{ success: true, order: {...}, key: "rzp_test_..." }`

### POST /api/payment/verify-payment
Verifies payment after completion
- **Body:** `{ razorpay_order_id, razorpay_payment_id, razorpay_signature }`
- **Response:** `{ success: true, message: "...", subscription: {...} }`

### GET /api/payment/subscription-status
Gets current user's subscription status
- **Response:** `{ success: true, subscription: {...} }`

### GET /api/payment/payment-history
Gets user's payment history
- **Response:** `{ success: true, payments: [...] }`

## Security Features

1. **Signature Verification:** All payments are verified using Razorpay signature
2. **User Authentication:** All endpoints require valid Firebase session
3. **Order Validation:** Orders are validated against the creating user
4. **Secure Cookies:** Session cookies are HttpOnly and Secure
5. **Environment Variables:** Sensitive keys are stored in environment variables

## Troubleshooting

### Common Issues

1. **"Razorpay SDK not loaded" error:**
   - Ensure the Razorpay script is loaded in `index.html`
   - Check browser console for script loading errors

2. **Payment verification fails:**
   - Verify your Razorpay Key Secret is correct
   - Check backend logs for signature verification errors

3. **Order creation fails:**
   - Ensure user is authenticated
   - Check Razorpay API key permissions
   - Verify amount is in correct format (paise for INR)

4. **Subscription not activated:**
   - Check Firestore rules allow user updates
   - Verify backend has proper Firebase Admin permissions

### Debug Mode

Enable debug logging by setting in backend:
```env
NODE_ENV=development
```

This will log detailed information about payment processing.

## Going Live

To switch to production:

1. Complete Razorpay KYC verification
2. Get Live Mode API keys from Razorpay Dashboard
3. Update environment variables with Live keys
4. Set `NODE_ENV=production` in backend
5. Test thoroughly with small amounts first

## Support

For Razorpay-specific issues:
- [Razorpay Documentation](https://razorpay.com/docs/)
- [Razorpay Support](https://razorpay.com/support/)

For application-specific issues:
- Check the browser console for frontend errors
- Check backend logs for API errors
- Verify Firebase Authentication is working
- Ensure all environment variables are set correctly