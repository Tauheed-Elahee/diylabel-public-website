import { Metadata } from 'next';
import SignupForm from './components/SignupForm';

export const metadata: Metadata = {
  title: 'Sign Up - DIY Label',
  description: 'Create your DIY Label account',
};

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
            DIY Label
          </h1>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Or{' '}
            <a
              href="/auth/login"
              className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
            >
              sign in to your existing account
            </a>
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}