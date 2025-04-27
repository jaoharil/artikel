'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/axios';
import ArticleCard from '@/components/articles/ArticleCard';
import Pagination from '@/components/articles/Pagination';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null); // Tambah state user
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch articles
  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await api.get('/articles', {
          params: {
            page: currentPage,
            search,
            category,
          },
        });
        setArticles(res.data.data);
        setTotalPages(res.data.meta?.last_page || 1);
      } catch (err) {
        console.error(err);
      }
    }
    fetchArticles();
  }, [search, category, currentPage]);

  // Fetch user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="relative bg-[url('/bg.jpg')] bg-cover bg-center py-12 text-center text-white">
        {/* Overlay warna biru transparan */}
        <div className="absolute inset-0 bg-[#2563EBDB]"></div>

        {/* Navbar */}
        <nav className="relative z-10 flex items-center justify-between px-8 py-4">
          {/* Logo */}
          <div className="text-2xl font-bold">
            <img src="/logo.png" alt="Logo" className="h-8" />
          </div>

          {/* Profile */}
          <div className="flex items-center gap-4">
            <span className="text-white hidden md:inline">{user ? `Hi, ${user.username}!` : 'Hi, Guest!'}</span>
            <img src="/profile.jpg" alt="Profile" className="h-8 w-8 rounded-full object-cover border-2 border-white" />
          </div>
        </nav>

        {/* Konten */}
        <div className="relative z-10 mt-8">
          <p className="text-lg mb-6">Blog genzet</p>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">The Journal: Design Resources,</h1>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Interviews, and Industry News</h1>
          <p className="text-lg mb-6">Your daily dose of design insights!</p>

          {/* Filter */}
          <div className="flex justify-center items-center gap-4">
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-4 py-2 rounded bg-white text-black">
              <option value="">Select category</option>
              <option value="design">Design</option>
              <option value="technology">Technology</option>
              <option value="interview">Interview</option>
            </select>

            {/* Search Input */}
            <div className="flex items-center px-4 bg-white rounded">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l-4 4m0 0l4-4m-4 4H20" />
              </svg>
              <input type="text" placeholder="Search articles" value={search} onChange={(e) => setSearch(e.target.value)} className="py-3 w-60 text-gray-700 focus:outline-none" />
            </div>
          </div>
        </div>
      </div>

      {/* List Articles */}
      <div className="max-w-6xl mx-auto p-8 grid md:grid-cols-3 gap-6">
        {articles.length > 0 ? articles.map((article) => <ArticleCard key={article.id} article={article} />) : <p className="col-span-3 text-center text-gray-500">No articles found</p>}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mb-8">
        <Pagination currentPage={currentPage} totalPages={totalPages} setPage={setCurrentPage} />
      </div>

      {/* Footer */}
      <footer className="bg-blue-700 text-white py-4 text-center text-sm">© 2025 LogoIpsum. All rights reserved.</footer>
    </div>
  );
}
