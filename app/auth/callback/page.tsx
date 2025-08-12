import { redirect } from 'next/navigation';

export default function AuthCallback() {
  // This page handles the auth callback and redirects
  redirect('/dashboard');
}