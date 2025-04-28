'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/layout/AdminSidebar';
import AdminHeader from '@/components/layout/AdminHeader';

export default function AdminProfilePage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-6">
        {/* Header */}
        <AdminHeader title="User Profile" />

        {/* Profile Content */}
        <div className="flex flex-col items-center justify-center mt-12">
          {/* Avatar */}
          <div className="bg-blue-100 text-blue-700 rounded-full h-20 w-20 flex items-center justify-center text-2xl font-bold mb-6">{user?.username?.charAt(0).toUpperCase() || 'U'}</div>

          {/* User Info */}
          <div className="bg-white shadow rounded p-6 w-full max-w-md">
            <div className="flex items-center mb-4">
              <span className="w-24 font-semibold">Username</span>
              <span className="mr-2">:</span>
              <span>{user?.username || '-'}</span>
            </div>
            <div className="flex items-center mb-4">
              <span className="w-24 font-semibold">Password</span>
              <span className="mr-2">:</span>
              <span>{user?.password || '-'}</span>
            </div>
            <div className="flex items-center mb-6">
              <span className="w-24 font-semibold">Role</span>
              <span className="mr-2">:</span>
              <span>{user?.role || '-'}</span>
            </div>

            {/* Back Button */}
            <button onClick={() => router.push('/admin/articles')} className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Back to dashboard
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
