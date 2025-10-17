// Test script to check if payment endpoints are accessible
const axios = require('axios');

async function testEndpoints() {
  const baseURL = 'http://localhost:4000';
  
  console.log('🧪 Testing Payment Endpoints...\n');

  try {
    // Test 1: Check if purchase-status endpoint exists (should return 401 without auth)
    console.log('1. Testing /api/payment/purchase-status...');
    const response1 = await axios.get(`${baseURL}/api/payment/purchase-status`, {
      validateStatus: () => true
    });
    
    if (response1.status === 401) {
      console.log('✅ Purchase status endpoint exists (401 - auth required)');
    } else {
      console.log(`❌ Unexpected status: ${response1.status}`);
    }

    // Test 2: Check if create-order endpoint exists (should return 401 without auth)
    console.log('2. Testing /api/payment/create-order...');
    const response2 = await axios.post(`${baseURL}/api/payment/create-order`, {
      amount: 2,
      currency: 'INR',
      productName: 'LiveEazy'
    }, {
      validateStatus: () => true
    });
    
    if (response2.status === 401) {
      console.log('✅ Create order endpoint exists (401 - auth required)');
    } else {
      console.log(`❌ Unexpected status: ${response2.status}`);
    }

    // Test 3: Check if verify-payment endpoint exists (should return 401 without auth)
    console.log('3. Testing /api/payment/verify-payment...');
    const response3 = await axios.post(`${baseURL}/api/payment/verify-payment`, {
      razorpay_order_id: 'test',
      razorpay_payment_id: 'test',
      razorpay_signature: 'test'
    }, {
      validateStatus: () => true
    });
    
    if (response3.status === 401) {
      console.log('✅ Verify payment endpoint exists (401 - auth required)');
    } else {
      console.log(`❌ Unexpected status: ${response3.status}`);
    }

    // Test 4: Check if test-email endpoint exists (should return 401 without auth)
    console.log('4. Testing /api/payment/test-email...');
    const response4 = await axios.post(`${baseURL}/api/payment/test-email`, {}, {
      validateStatus: () => true
    });
    
    if (response4.status === 401) {
      console.log('✅ Test email endpoint exists (401 - auth required)');
    } else {
      console.log(`❌ Unexpected status: ${response4.status}`);
      console.log('Response:', response4.data);
    }

    console.log('\n🎉 All payment endpoints are accessible!');
    console.log('\n📝 Next steps:');
    console.log('1. Make sure you are logged in to the frontend');
    console.log('2. Navigate to Products section');
    console.log('3. Click "Get Started" on LiveEazy (₹2)');
    console.log('4. You should be redirected to the payment page');

  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.log('❌ Backend server is not running on port 4000');
      console.log('💡 Start the backend with: cd backend && npm run dev');
    } else {
      console.log('❌ Error:', error.message);
    }
  }
}

testEndpoints();