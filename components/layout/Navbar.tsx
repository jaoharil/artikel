'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // 🔥 Tambahkan ini
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogoutConfirm = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <nav className="relative z-10 flex items-center justify-between px-4 md:px-8 py-4">
      {/* Modal logout di tengah */}
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
      <div className="text-2xl font-bold">
        <img src="/logo.png" alt="Logo" className="h-8" />
      </div>

      {/* Dropdown Profile */}
      <div className="relative" ref={dropdownRef}>
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <span className="text-white hidden md:inline text-sm md:text-base">{user ? `Hi, ${user.username}!` : 'Hi, Guest!'}</span>
          <img src="/profile.jpg" alt="Profile" className="h-8 w-8 md:h-10 md:w-10 rounded-full object-cover border-2 border-white" />
        </div>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-36 bg-white rounded shadow-md overflow-hidden z-30">
            <Link href="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>
              My Account
            </Link>
            <button
              onClick={() => {
                setShowLogoutModal(true); // 🔥 Buka modal logout custom
                setDropdownOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
