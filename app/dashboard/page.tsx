import { Metadata } from 'next';
import DashboardContent from './components/DashboardContent';

export const metadata: Metadata = {
  title: 'Dashboard - DIY Label',
  description: 'Your DIY Label dashboard',
};

export default function DashboardPage() {
  return <DashboardContent />;
}