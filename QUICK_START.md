# 🚀 Quick Start Guide - Razorpay Integration

## ✅ Setup Checklist

### 1. **Get Razorpay Test Credentials**
1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Sign up/Login and switch to **Test Mode**
3. Go to Settings → API Keys
4. Generate Test API Keys
5. Copy **Key ID** and **Key Secret**

### 2. **Update Backend Environment**
Replace the placeholders in `backend/.env`:
```env
RAZORPAY_KEY_ID=rzp_test_your_actual_key_id
RAZORPAY_KEY_SECRET=your_actual_key_secret
```

### 3. **Update Frontend Environment**
Replace the placeholders in `NovaFuze_web/.env`:
```env
VITE_FIREBASE_API_KEY=your_actual_firebase_api_key
VITE_FIREBASE_APP_ID=your_actual_firebase_app_id
VITE_RECAPTCHA_SITE_KEY=your_actual_recaptcha_key
```

### 4. **Install Dependencies**
```bash
# Backend (if not already done)
cd backend
npm install

# Frontend
cd ../NovaFuze_web
npm install
```

### 5. **Start the Application**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - MCP Server
cd mcp_server
source venv/bin/activate  # On Windows: venv\Scripts\activate
uvicorn main:app --reload

# Terminal 3 - Frontend
cd NovaFuze_web
npm run dev
```

## 🧪 **Test the Payment Flow**

1. **Navigate to Products**: Go to the Products section
2. **Find LiveEazy**: Look for the ₹799/month product
3. **Click "Get Started"**: This will redirect to payment page
4. **Click "Pay ₹799"**: Razorpay checkout will open
5. **Use Test Credentials**:
   - **Card**: 4111 1111 1111 1111
   - **Expiry**: 12/25
   - **CVV**: 123
   - **Name**: Test User

## 🎯 **Expected Results**

✅ **Success Flow:**
1. Payment page loads with plan details
2. Razorpay checkout opens with payment options
3. Test payment completes successfully
4. User redirected with success message
5. Subscription status shows "Premium Active" in header
6. User profile updated with subscription details

❌ **If Something Goes Wrong:**
- Check browser console for errors
- Check backend logs for API errors
- Verify all environment variables are set
- Ensure Firebase authentication is working

## 🔧 **Quick Troubleshooting**

### "Razorpay SDK not loaded"
- Check if Razorpay script is in `NovaFuze_web/index.html`
- Should have: `<script src="https://checkout.razorpay.com/v1/checkout.js"></script>`

### "Payment verification failed"
- Double-check your Razorpay Key Secret in backend `.env`
- Ensure no extra spaces in the key

### "User not authenticated"
- Make sure you're logged in to the application
- Check if Firebase authentication is properly configured

### "Order creation failed"
- Verify Razorpay Key ID is correct
- Check if backend server is running on port 4000

## 📱 **Payment Methods Available**

In Test Mode, you can test:
- **Credit/Debit Cards**: Use test card numbers
- **UPI**: Use `success@razorpay` for success, `failure@razorpay` for failure
- **Net Banking**: Select any bank and use test credentials
- **Wallets**: Test wallet payments

## 🎉 **What's Included**

✅ Complete payment integration with Razorpay
✅ Subscription management system
✅ Payment history tracking
✅ Automatic subscription expiry handling
✅ Beautiful payment UI with loading states
✅ Secure payment verification
✅ Real-time subscription status in header
✅ Mobile-responsive payment page

## 📞 **Need Help?**

1. Check the detailed `RAZORPAY_SETUP.md` guide
2. Review browser console and backend logs
3. Verify all environment variables are correctly set
4. Test with different payment methods

Happy testing! 🚀