'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LockIcon, ArrowLeft } from 'lucide-react';

export default function NotAuthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-50 via-white to-green-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center border border-green-100">
        <div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-100 rounded-full mb-4">
          <LockIcon className="w-8 h-8 text-green-600" />
        </div>

        <h1 className="text-2xl font-semibold text-green-800 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          Sorry, You don’t have permission to access this page. Please contact the administrator or try a different account.
        </p>

        <Button
          onClick={() => router.push('/')}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Home
        </Button>
      </div>
    </div>
  );
}
