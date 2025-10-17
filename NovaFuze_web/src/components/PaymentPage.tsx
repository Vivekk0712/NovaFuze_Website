import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { CheckCircle, CreditCard, Shield, Clock, ArrowLeft } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { 
  createPaymentOrder, 
  verifyPayment, 
  handleRazorpayPayment,
  getPurchaseStatus 
} from '../services/paymentApi';
import { toast } from 'sonner';

const PaymentPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [purchaseStatus, setPurchaseStatus] = useState<any>(null);
  const [loadingStatus, setLoadingStatus] = useState(true);

  const productDetails = {
    name: 'LiveEazy',
    price: 2,
    currency: 'INR',
    features: [
      'Smart home integration',
      'Personal assistant AI',
      'Automation workflows',
      'Lifestyle tracking',
      'Premium support',
      'Lifetime access'
    ]
  };

  useEffect(() => {
    fetchPurchaseStatus();
  }, []);

  const fetchPurchaseStatus = async () => {
    try {
      const response = await getPurchaseStatus();
      setPurchaseStatus(response);
    } catch (error) {
      console.error('Error fetching purchase status:', error);
    } finally {
      setLoadingStatus(false);
    }
  };

  const handlePayment = async () => {
    if (!user) {
      toast.error('Please login to continue');
      return;
    }

    setLoading(true);
    
    try {
      // Create order
      const orderResponse = await createPaymentOrder({
        amount: productDetails.price,
        currency: productDetails.currency,
        productName: productDetails.name
      });

      if (!orderResponse.success) {
        throw new Error('Failed to create payment order');
      }

      // Handle Razorpay payment
      handleRazorpayPayment(
        orderResponse.order,
        orderResponse.key,
        {
          name: user.displayName || user.email || '',
          email: user.email || '',
          contact: user.phoneNumber || ''
        },
        productDetails.name,
        async (response) => {
          // Payment successful, verify on backend
          try {
            const verifyResponse = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            if (verifyResponse.success) {
              toast.success('Payment successful! You now own LiveEazy.');
              await fetchPurchaseStatus(); // Refresh purchase status
              // Redirect to home or dashboard
              window.location.hash = '#home';
            } else {
              toast.error('Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            toast.error('Payment verification failed');
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.error('Payment error:', error);
          toast.error(error.message || 'Payment failed');
          setLoading(false);
        }
      );
    } catch (error) {
      console.error('Payment initiation error:', error);
      toast.error('Failed to initiate payment');
      setLoading(false);
    }
  };

  const goBack = () => {
    window.history.back();
  };

  if (loadingStatus) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading purchase details...</p>
        </div>
      </div>
    );
  }

  // If user already purchased LiveEazy
  if (purchaseStatus?.hasPurchased) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Card className="shadow-xl">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-green-600">Already Purchased</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-gray-600">
                  You have already purchased LiveEazy! You can access all features now.
                </p>
                <div className="flex justify-center gap-4">
                  <Button onClick={goBack} variant="outline">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Go Back
                  </Button>
                  <Button onClick={() => window.location.hash = '#home'}>
                    Go to Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Button 
            onClick={goBack} 
            variant="ghost" 
            className="mb-4 self-start"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Purchase LiveEazy
          </h1>
          <p className="text-gray-600 text-lg">
            Get lifetime access to our comprehensive lifestyle management platform
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="shadow-xl border-2 border-purple-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">{productDetails.name}</CardTitle>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    One-time Purchase
                  </Badge>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-purple-600">
                    ₹{productDetails.price}
                  </span>
                  <span className="text-gray-500">one-time</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {productDetails.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Payment Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* User Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Account Information</h4>
                  <p className="text-sm text-gray-600">
                    <strong>Name:</strong> {user?.displayName || 'Not provided'}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Email:</strong> {user?.email}
                  </p>
                </div>

                {/* Payment Summary */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span>LiveEazy (One-time)</span>
                    <span>₹{productDetails.price}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span>Tax</span>
                    <span>Included</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between items-center font-bold text-lg">
                    <span>Total</span>
                    <span>₹{productDetails.price}</span>
                  </div>
                </div>

                {/* Security Info */}
                <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span>Secured by Razorpay. Your payment information is encrypted and secure.</span>
                </div>

                {/* Payment Button */}
                <Button
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 text-lg font-semibold"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <div className="spinner-border spinner-border-sm me-2" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      Pay ₹{productDetails.price}
                    </>
                  )}
                </Button>

                {/* Payment Methods Info */}
                <div className="text-center text-sm text-gray-500">
                  <p className="flex items-center justify-center gap-1">
                    <Clock className="w-4 h-4" />
                    Instant access after successful payment
                  </p>
                  <p className="mt-2">
                    Supports Credit Card, Debit Card, UPI, Net Banking & Wallets
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;