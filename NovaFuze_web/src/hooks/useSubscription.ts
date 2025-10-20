import { useState, useEffect } from 'react';
import { getSubscriptionStatus } from '../services/paymentApi';

export interface Subscription {
    status: 'active' | 'inactive' | 'expired';
    planType?: string;
    startDate?: string;
    endDate?: string;
    amount?: number;
    currency?: string;
}

export const useSubscription = () => {
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSubscription = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getSubscriptionStatus();
            if (response.success) {
                setSubscription(response.subscription);
            } else {
                setError('Failed to fetch subscription status');
            }
        } catch (err) {
            console.error('Error fetching subscription:', err);
            setError('Failed to fetch subscription status');
            // Set default inactive status on error
            setSubscription({ status: 'inactive' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubscription();
    }, []);

    const refreshSubscription = () => {
        fetchSubscription();
    };

    const isActive = subscription?.status === 'active';
    const isExpired = subscription?.status === 'expired';
    const isInactive = subscription?.status === 'inactive';

    return {
        subscription,
        loading,
        error,
        refreshSubscription,
        isActive,
        isExpired,
        isInactive
    };
};