const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const verifySession = require('../middleware/verifySession');
const admin = require('../firebase');
const { sendPaymentConfirmationEmail } = require('../services/emailService');

const router = express.Router();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create order endpoint
router.post('/create-order', verifySession, async (req, res) => {
  try {
    const { amount, currency = 'INR', productName = 'LiveEazy' } = req.body;
    const userId = req.user.uid;

    // Get user details from Firestore
    const userRef = admin.firestore().collection('users').doc(userId);
    const userDoc = await userRef.get();
    
    if (!userDoc.exists) {
      return res.status(404).json({ 
        error: { code: 'USER_NOT_FOUND', message: 'User not found' } 
      });
    }

    const userData = userDoc.data();

    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: currency,
      receipt: `rcpt_${Date.now().toString().slice(-8)}_${userId.slice(-8)}`,
      notes: {
        userId: userId,
        userEmail: userData.email || '',
        userName: userData.displayName || '',
        productName: productName,
        paymentType: 'one-time',
        timestamp: new Date().toISOString()
      }
    };

    const order = await razorpay.orders.create(options);
    
    // Store order in Firestore for tracking
    await admin.firestore().collection('payment_orders').doc(order.id).set({
      orderId: order.id,
      userId: userId,
      amount: amount,
      currency: currency,
      productName: productName,
      paymentType: 'one-time',
      status: 'created',
      createdAt: new Date().toISOString(),
      userEmail: userData.email || '',
      userName: userData.displayName || ''
    });

    res.json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt
      },
      key: process.env.RAZORPAY_KEY_ID
    });

  } catch (error) {
    console.error('Error creating Razorpay order:', {
      statusCode: error.statusCode,
      error: error.error
    });
    res.status(500).json({ 
      success: false,
      error: { 
        code: 'ORDER_CREATION_FAILED', 
        message: 'Failed to create payment order',
        details: error.error || error.message
      } 
    });
  }
});

// Verify payment endpoint
router.post('/verify-payment', verifySession, async (req, res) => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature 
    } = req.body;

    const userId = req.user.uid;

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ 
        error: { code: 'INVALID_SIGNATURE', message: 'Payment verification failed' } 
      });
    }

    // Get order details from Firestore
    const orderRef = admin.firestore().collection('payment_orders').doc(razorpay_order_id);
    const orderDoc = await orderRef.get();

    if (!orderDoc.exists) {
      return res.status(404).json({ 
        error: { code: 'ORDER_NOT_FOUND', message: 'Order not found' } 
      });
    }

    const orderData = orderDoc.data();

    // Verify the order belongs to the current user
    if (orderData.userId !== userId) {
      return res.status(403).json({ 
        error: { code: 'UNAUTHORIZED', message: 'Order does not belong to current user' } 
      });
    }

    // Update order status
    await orderRef.update({
      status: 'completed',
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
      completedAt: new Date().toISOString()
    });

    // Update user with purchase information
    const userRef = admin.firestore().collection('users').doc(userId);

    await userRef.update({
      purchases: admin.firestore.FieldValue.arrayUnion({
        productName: orderData.productName,
        amount: orderData.amount,
        currency: orderData.currency,
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        purchaseDate: new Date().toISOString(),
        status: 'completed'
      }),
      lastPayment: {
        amount: orderData.amount,
        currency: orderData.currency,
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        productName: orderData.productName,
        date: new Date().toISOString()
      }
    });

    // Send payment confirmation email (only if email is configured)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        // Get user's profile email (preferred) or fallback to Firebase email
        const userRef = admin.firestore().collection('users').doc(userId);
        const userDoc = await userRef.get();
        const userData = userDoc.data();
        
        const emailToUse = userData.email || orderData.userEmail;
        const nameToUse = userData.displayName || orderData.userName;
        
        if (emailToUse) {
          const emailResult = await sendPaymentConfirmationEmail(
            emailToUse,
            nameToUse,
            {
              productName: orderData.productName,
              amount: orderData.amount,
              currency: orderData.currency,
              paymentId: razorpay_payment_id,
              orderId: razorpay_order_id,
              purchaseDate: new Date().toISOString()
            }
          );
          
          if (emailResult.success) {
            console.log('✅ Payment confirmation email sent successfully to:', emailToUse);
          } else {
            console.error('❌ Failed to send payment confirmation email:', emailResult.error);
          }
        } else {
          console.log('📧 No email address available for user - skipping email');
        }
      } catch (emailError) {
        console.error('❌ Error sending payment confirmation email:', emailError);
        // Don't fail the payment verification if email fails
      }
    } else {
      console.log('📧 Email not configured - skipping payment confirmation email');
    }

    res.json({
      success: true,
      message: 'Payment verified successfully',
      purchase: {
        productName: orderData.productName,
        amount: orderData.amount,
        currency: orderData.currency,
        purchaseDate: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ 
      error: { code: 'VERIFICATION_FAILED', message: 'Payment verification failed' } 
    });
  }
});

// Get user purchase status
router.get('/purchase-status', verifySession, async (req, res) => {
  try {
    const userId = req.user.uid;
    
    const userRef = admin.firestore().collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ 
        error: { code: 'USER_NOT_FOUND', message: 'User not found' } 
      });
    }

    const userData = userDoc.data();
    const purchases = userData.purchases || [];
    const lastPayment = userData.lastPayment || null;

    // Check if user has purchased LiveEazy
    const hasLiveEazy = purchases.some(purchase => 
      purchase.productName === 'LiveEazy' && purchase.status === 'completed'
    );

    res.json({
      success: true,
      hasPurchased: hasLiveEazy,
      purchases: purchases,
      lastPayment: lastPayment
    });

  } catch (error) {
    console.error('Error fetching purchase status:', error);
    res.status(500).json({ 
      error: { code: 'FETCH_FAILED', message: 'Failed to fetch purchase status' } 
    });
  }
});

// Get payment history
router.get('/payment-history', verifySession, async (req, res) => {
  try {
    const userId = req.user.uid;
    
    const ordersSnapshot = await admin.firestore()
      .collection('payment_orders')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .limit(10)
      .get();

    const payments = [];
    ordersSnapshot.forEach(doc => {
      payments.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json({
      success: true,
      payments: payments
    });

  } catch (error) {
    console.error('Error fetching payment history:', error);
    res.status(500).json({ 
      error: { code: 'FETCH_FAILED', message: 'Failed to fetch payment history' } 
    });
  }
});

// Test email endpoint (for debugging)
router.post('/test-email', verifySession, async (req, res) => {
  try {
    const userId = req.user.uid;
    
    // Get user details from Firestore
    const userRef = admin.firestore().collection('users').doc(userId);
    const userDoc = await userRef.get();
    
    if (!userDoc.exists) {
      return res.status(404).json({ 
        error: { code: 'USER_NOT_FOUND', message: 'User not found' } 
      });
    }

    const userData = userDoc.data();
    
    console.log('🧪 Testing email system...');
    console.log('User email:', userData.email);
    console.log('User name:', userData.displayName);
    console.log('EMAIL_USER configured:', process.env.EMAIL_USER ? 'Yes' : 'No');
    console.log('EMAIL_PASS configured:', process.env.EMAIL_PASS ? 'Yes' : 'No');
    
    // Test email sending
    const emailResult = await sendPaymentConfirmationEmail(
      userData.email,
      userData.displayName || 'Test User',
      {
        productName: 'LiveEazy (Test)',
        amount: 2,
        currency: 'INR',
        paymentId: 'test_payment_123',
        orderId: 'test_order_456',
        purchaseDate: new Date().toISOString()
      }
    );
    
    if (emailResult.success) {
      console.log('✅ Test email sent successfully!');
      res.json({
        success: true,
        message: 'Test email sent successfully! Check your inbox.',
        emailResult: emailResult
      });
    } else {
      console.error('❌ Test email failed:', emailResult.error);
      res.status(500).json({
        success: false,
        message: 'Test email failed',
        error: emailResult.error
      });
    }
    
  } catch (error) {
    console.error('❌ Error testing email:', error);
    res.status(500).json({ 
      error: { code: 'EMAIL_TEST_FAILED', message: error.message } 
    });
  }
});

module.exports = router;