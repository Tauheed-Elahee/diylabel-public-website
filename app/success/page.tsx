import { Metadata } from 'next';
import SuccessContent from './components/SuccessContent';

export const metadata: Metadata = {
  title: 'Payment Successful - DIY Label',
  description: 'Your payment was processed successfully',
};

export default function SuccessPage() {
  return <SuccessContent />;
}