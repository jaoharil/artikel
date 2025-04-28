'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import api from '@/lib/axios';
import ArticleCard from '@/components/articles/ArticleCard';
import Pagination from '@/components/articles/Pagination';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await api.get('/articles', { params: { page: currentPage, search, category } });
        setArticles(res.data.data);
        setTotalPages(res.data.meta?.last_page || 1);
      } catch (err) {
        console.error(err);
      }
    }
    fetchArticles();
  }, [search, category, currentPage]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Modal Logout */}
      {showLogoutModal && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <h2 className="text-lg font-semibold mb-4">Logout</h2>
            <p className="text-gray-600 mb-6">Are you sure want to logout?</p>
            <div className="flex justify-center gap-4">
              <button onClick={() => setShowLogoutModal(false)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                Cancel
              </button>
              <button onClick={handleLogoutConfirm} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative bg-[url('/bg.jpg')] bg-cover bg-center text-white">
        <div className="absolute inset-0 bg-[#2563EBDB] pointer-events-none"></div>

        {/* Navbar */}
        <Navbar />

        {/* Konten Header */}
        <div className="relative  mt-8 px-4 text-center">
          <p className="text-base md:text-lg mb-4">Blog genzet</p>
          <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-2">The Journal: Design Resources,</h1>
          <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-4">Interviews, and Industry News</h1>
          <p className="text-base md:text-lg mb-6">Your daily dose of design insights!</p>

          {/* Filter + Search */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 w-full max-w-md mx-auto p-3">
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-4 py-2 rounded bg-white text-black w-full md:w-auto">
              <option value="">Select category</option>
              <option value="design">Design</option>
              <option value="technology">Technology</option>
              <option value="interview">Interview</option>
            </select>

            {/* Search Input */}
            <div className="flex items-center w-full md:w-auto bg-white rounded px-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l-4 4m0 0l4-4m-4 4H20" />
              </svg>
              <input type="text" placeholder="Search articles" value={search} onChange={(e) => setSearch(e.target.value)} className="py-2 w-full text-gray-700 focus:outline-none" />
            </div>
          </div>
        </div>
      </div>

      {/* List Articles */}
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.length > 0 ? articles.map((article) => <ArticleCard key={article.id} article={article} />) : <p className="col-span-3 text-center text-gray-500">No articles found</p>}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mb-8">
        <Pagination currentPage={currentPage} totalPages={totalPages} setPage={setCurrentPage} />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
