// Test email sending without making a payment
// Run with: node test-email.js

const axios = require('axios');

async function testEmail() {
  console.log('🧪 Testing Email System...\n');

  try {
    // Note: You need to be logged in to test this
    // This will only work if you have a valid session cookie
    
    const response = await axios.post('http://localhost:4000/api/payment/test-email', {}, {
      withCredentials: true,
      validateStatus: () => true
    });

    console.log('Response Status:', response.status);
    console.log('Response Data:', response.data);

    if (response.status === 200) {
      console.log('\n✅ SUCCESS: Test email sent!');
      console.log('📧 Check your email inbox for the test email.');
    } else if (response.status === 401) {
      console.log('\n❌ ERROR: Not authenticated');
      console.log('💡 You need to be logged in to test emails.');
      console.log('💡 Login to your app first, then run this test.');
    } else {
      console.log('\n❌ ERROR: Email test failed');
      console.log('💡 Check the backend console for detailed error messages.');
    }

  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.log('❌ ERROR: Backend server not running');
      console.log('💡 Start the backend server first: cd backend && npm start');
    } else {
      console.log('❌ ERROR:', error.message);
    }
  }
}

console.log('📧 Email Test Script');
console.log('===================');
console.log('This will test if your email system is working.');
console.log('Make sure you are logged in to your app first!\n');

testEmail();