// app/ontime/page.js
'use client';

import { Toaster } from 'react-hot-toast';
import ScheduleForm from '@/components/ontime/ScheduleForm';

export default function OntimePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" />
      <ScheduleForm />
    </div>
  );
}