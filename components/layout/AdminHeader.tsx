'use client';

import { useEffect, useState } from 'react';

export default function AdminHeader({ title }: { title: string }) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex items-center gap-2">
        <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">{user?.username?.charAt(0).toUpperCase() ?? 'U'}</div>
        <span className="text-sm font-medium">{user?.username ?? 'User'}</span>
      </div>
    </div>
  );
}
