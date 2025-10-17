import React from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ShoppingBag, CheckCircle } from 'lucide-react';
import { usePurchase } from '../hooks/usePurchase';

interface PurchaseStatusProps {
  showPurchaseButton?: boolean;
  compact?: boolean;
}

const PurchaseStatus: React.FC<PurchaseStatusProps> = ({ 
  showPurchaseButton = true, 
  compact = false 
}) => {
  const { loading, hasPurchasedLiveEazy } = usePurchase();

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <div className="animate-pulse bg-gray-200 h-6 w-20 rounded"></div>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        {hasPurchasedLiveEazy && (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Purchased
          </Badge>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {hasPurchasedLiveEazy ? (
        <Badge className="bg-green-100 text-green-800 border-green-200 px-3 py-1">
          <CheckCircle className="w-4 h-4 mr-2" />
          LiveEazy Purchased
        </Badge>
      ) : (
        <>
          {showPurchaseButton && (
            <Button 
              size="sm" 
              onClick={() => window.location.hash = 'payment'}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <ShoppingBag className="w-4 h-4 mr-1" />
              Buy LiveEazy
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default PurchaseStatus;