'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // ← Import router

export default function AdminHeader({ title }: { title: string }) {
  const [user, setUser] = useState<any>(null);
  const router = useRouter(); // ← Init router

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleProfileClick = () => {
    router.push('/admin/profile');
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">{title}</h1>

      {/* Avatar + Username bisa diklik */}
      <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition" onClick={handleProfileClick}>
        <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">{user?.username?.charAt(0).toUpperCase() ?? 'U'}</div>
        <span className="text-sm font-medium">{user?.username ?? 'User'}</span>
      </div>
    </div>
  );
}
