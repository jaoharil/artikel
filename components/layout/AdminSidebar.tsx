'use client';

import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function AdminSidebar() {
  const [user, setUser] = useState<any>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogoutConfirm = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <aside className="w-60 min-h-screen bg-blue-700 text-white p-6 flex flex-col gap-6">
      {showLogoutModal && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <h2 className="text-lg text-black font-semibold mb-4">Logout</h2>
            <p className="text-black mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-center gap-4">
              <button onClick={() => setShowLogoutModal(false)} className="px-4 py-2 text-black bg-gray-200 rounded hover:bg-gray-300">
                Cancel
              </button>
              <button onClick={handleLogoutConfirm} className="px-4 py-2 bg-blue-600 text-black rounded hover:bg-blue-700">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Logo */}
      <div className="text-2xl font-bold mb-8">
        <Image src="/logo.png" alt="Logo" className="h-8" width={100} height={100} />
      </div>

      {/* Menu */}
      <Link href="/admin/articles" className="hover:text-blue-300">
        Articles
      </Link>
      <Link href="/admin/category" className="hover:text-blue-300">
        Category
      </Link>

      {/* Logout */}
      <button
        onClick={() => {
          setShowLogoutModal(true);
          setDropdownOpen(false);
        }}
        className="block w-full text-left  text-sm text-white hover:text-blue-300"
      >
        Logout
      </button>
    </aside>
  );
}
