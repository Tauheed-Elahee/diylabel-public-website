'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, ArrowRight, Home } from 'lucide-react';

export default function SuccessContent() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const sessionId = searchParams.get('session_id');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 dark:bg-green-900/20">
            <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Payment Successful!
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Thank you for supporting DIY Label development.
          </p>
          {sessionId && (
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
              Session ID: {sessionId}
            </p>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            What's Next?
          </h3>
          <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
              Your payment has been processed successfully
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
              You'll receive a confirmation email shortly
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
              Your contribution helps fund DIY Label development
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            Go to Dashboard
          </button>
          <button
            onClick={() => router.push('/')}
            className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}