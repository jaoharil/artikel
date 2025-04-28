'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser({
        username: 'Guest',
        password: '',
        role: 'User',
      });
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <h1 className="text-xl md:text-2xl font-semibold mb-6">User Profile</h1>

        {/* Foto profile huruf */}
        <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 text-xl font-bold mb-6">{user.username.charAt(0).toUpperCase()}</div>

        {/* Data User */}
        <div className="space-y-4 w-full max-w-xs">
          <div className="flex items-center gap-2">
            <label className="w-24 font-medium">Username :</label>
            <input type="text" value={user.username} disabled className="flex-1 px-4 py-2 rounded bg-gray-100 text-sm" />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-24 font-medium">Password :</label>
            <input type="password" value={user.password ?? '********'} disabled className="flex-1 px-4 py-2 rounded bg-gray-100 text-sm" />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-24 font-medium">Role :</label>
            <input type="text" value={user.role ?? 'User'} disabled className="flex-1 px-4 py-2 rounded bg-gray-100 text-sm" />
          </div>
        </div>

        {/* Tombol back to home */}
        <Link href="/" className="mt-8 inline-block">
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded w-full">Back to home</button>
        </Link>
      </main>

      <Footer />
    </div>
  );
}
