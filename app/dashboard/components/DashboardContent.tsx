'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabase';
import { User } from '@supabase/supabase-js';
import { products } from '../../../src/stripe-config';
import { Loader2, CreditCard, LogOut, Crown } from 'lucide-react';

interface Subscription {
  subscription_status: string;
  price_id: string | null;
  current_period_end: number | null;
  cancel_at_period_end: boolean;
}

export default function DashboardContent() {
  const [user, setUser] = useState<User | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
          router.push('/auth/login');
          return;
        }

        setUser(user);

        // Fetch subscription data
        const { data: subscriptionData, error: subError } = await supabase
          .from('stripe_user_subscriptions')
          .select('*')
          .maybeSingle();

        if (subError) {
          console.error('Error fetching subscription:', subError);
          setError('Failed to load subscription data');
        } else {
          setSubscription(subscriptionData);
        }
      } catch (err) {
        console.error('Error:', err);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const handleCheckout = async (priceId: string, mode: 'payment' | 'subscription') => {
    setCheckoutLoading(priceId);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/auth/login');
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          price_id: priceId,
          success_url: `${window.location.origin}/success`,
          cancel_url: `${window.location.origin}/dashboard`,
          mode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      setError(err.message || 'Failed to start checkout process');
    } finally {
      setCheckoutLoading(null);
    }
  };

  const getSubscriptionPlanName = () => {
    if (!subscription?.price_id) return null;
    
    const product = products.find(p => p.priceId === subscription.price_id);
    return product?.name || 'Unknown Plan';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                DIY Label
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {subscription && getSubscriptionPlanName() && (
                <div className="flex items-center space-x-2 bg-primary-50 dark:bg-primary-900/20 px-3 py-1 rounded-full">
                  <Crown className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                    {getSubscriptionPlanName()}
                  </span>
                </div>
              )}
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {user?.email}
              </span>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome back!
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Manage your DIY Label account and explore our products.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4 mb-6">
              <div className="text-sm text-red-600 dark:text-red-400">{error}</div>
            </div>
          )}

          {/* Products Section */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Available Products
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Support DIY Label development and get early access to features.
              </p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div
                    key={product.priceId}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {product.name}
                      </h4>
                      <CreditCard className="w-5 h-5 text-gray-400" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {product.description}
                    </p>
                    <button
                      onClick={() => handleCheckout(product.priceId, product.mode)}
                      disabled={checkoutLoading === product.priceId}
                      className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {checkoutLoading === product.priceId ? (
                        <>
                          <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                          Processing...
                        </>
                      ) : (
                        `Purchase ${product.mode === 'subscription' ? 'Subscription' : 'Now'}`
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Subscription Status */}
          {subscription && (
            <div className="mt-8 bg-white dark:bg-gray-800 shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Subscription Status
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white capitalize">
                      {subscription.subscription_status.replace('_', ' ')}
                    </dd>
                  </div>
                  {subscription.current_period_end && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {subscription.cancel_at_period_end ? 'Expires' : 'Renews'}
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                        {new Date(subscription.current_period_end * 1000).toLocaleDateString()}
                      </dd>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}