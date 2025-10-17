// Simple test script to verify payment endpoints
// Run with: node test-payment.js

const axios = require('axios');

const API_BASE = 'http://localhost:4000';

async function testPaymentEndpoints() {
  console.log('🧪 Testing Payment Endpoints...\n');

  try {
    // Test 1: Health check
    console.log('1. Testing server health...');
    const healthResponse = await axios.get(`${API_BASE}/api/me`, {
      validateStatus: () => true // Don't throw on 401
    });
    
    if (healthResponse.status === 401) {
      console.log('✅ Server is running (401 expected - not authenticated)');
    } else {
      console.log(`⚠️  Unexpected response: ${healthResponse.status}`);
    }

    // Test 2: Create order endpoint (should fail without auth)
    console.log('\n2. Testing create order endpoint (should fail without auth)...');
    const orderResponse = await axios.post(`${API_BASE}/api/payment/create-order`, {
      amount: 799,
      currency: 'INR',
      planType: 'monthly'
    }, {
      validateStatus: () => true
    });

    if (orderResponse.status === 401) {
      console.log('✅ Create order endpoint properly requires authentication');
    } else {
      console.log(`⚠️  Unexpected response: ${orderResponse.status}`);
    }

    // Test 3: Check if Razorpay is configured
    console.log('\n3. Checking Razorpay configuration...');
    const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

    if (razorpayKeyId && razorpayKeyId !== 'your_razorpay_key_id_here') {
      console.log('✅ Razorpay Key ID is configured');
    } else {
      console.log('❌ Razorpay Key ID not configured in backend/.env');
    }

    if (razorpayKeySecret && razorpayKeySecret !== 'your_razorpay_key_secret_here') {
      console.log('✅ Razorpay Key Secret is configured');
    } else {
      console.log('❌ Razorpay Key Secret not configured in backend/.env');
    }

    console.log('\n🎉 Basic endpoint tests completed!');
    console.log('\n📝 Next steps:');
    console.log('1. Add your actual Razorpay credentials to backend/.env');
    console.log('2. Start the frontend and test the full payment flow');
    console.log('3. Use test card: 4111 1111 1111 1111');

  } catch (error) {
    console.error('❌ Error testing endpoints:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure backend server is running on port 4000');
    console.log('2. Check if all dependencies are installed');
    console.log('3. Verify backend/.env file exists and is configured');
  }
}

// Run the test
testPaymentEndpoints();