import { useState, useEffect } from 'react';
import { getPurchaseStatus } from '../services/paymentApi';

export interface Purchase {
  productName: string;
  amount: number;
  currency: string;
  purchaseDate: string;
  status: string;
}

export interface PurchaseData {
  hasPurchased: boolean;
  purchases: Purchase[];
  lastPayment?: {
    amount: number;
    currency: string;
    productName: string;
    date: string;
  };
}

export const usePurchase = () => {
  const [purchaseData, setPurchaseData] = useState<PurchaseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPurchaseStatus = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getPurchaseStatus();
      if (response.success) {
        setPurchaseData({
          hasPurchased: response.hasPurchased,
          purchases: response.purchases,
          lastPayment: response.lastPayment
        });
      } else {
        setError('Failed to fetch purchase status');
      }
    } catch (err) {
      console.error('Error fetching purchase status:', err);
      setError('Failed to fetch purchase status');
      // Set default status on error
      setPurchaseData({ hasPurchased: false, purchases: [] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchaseStatus();
  }, []);

  const refreshPurchaseStatus = () => {
    fetchPurchaseStatus();
  };

  const hasPurchasedLiveEazy = purchaseData?.purchases.some(
    purchase => purchase.productName === 'LiveEazy' && purchase.status === 'completed'
  ) || false;

  return {
    purchaseData,
    loading,
    error,
    refreshPurchaseStatus,
    hasPurchasedLiveEazy,
    hasPurchased: purchaseData?.hasPurchased || false
  };
};