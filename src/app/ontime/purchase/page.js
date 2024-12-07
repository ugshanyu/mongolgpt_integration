// app/ontime/business/page.js
'use client';

import { Toaster } from 'react-hot-toast';
import BusinessForm from '@/components/ontime/BusinessForm';

export default function BusinessPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" />
      <BusinessForm />
    </div>
  );
}