'use client';

import AdminSidebar from '@/components/layout/AdminSidebar';
import AdminHeader from '@/components/layout/AdminHeader';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '@/lib/axios';

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await api.get('/articles', {
          params: { page: currentPage, search, category },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // ⬅️ kirim token kalau perlu
          },
        });
        setArticles(res.data.data);
        setTotalPages(res.data.meta?.last_page || 1);
      } catch (err) {
        console.error('Error fetch articles:', err);
      }
    }
    fetchArticles();
  }, [search, category, currentPage]);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-6 overflow-x-auto">
        {/* Header */}
        <AdminHeader title="Articles" />

        {/* Total Article & Filter */}
        <p className="text-sm text-gray-700 mb-4">Total Articles: {articles.length}</p>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-4 py-2 rounded border text-sm">
              <option value="">All Categories</option>
              <option value="technology">Technology</option>
              <option value="design">Design</option>
              <option value="interview">Interview</option>
            </select>
            <input type="text" placeholder="Search by title" value={search} onChange={(e) => setSearch(e.target.value)} className="px-4 py-2 rounded border text-sm" />
          </div>
          <Link href="/admin/articles/add">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">+ Add Article</button>
          </Link>
        </div>

        {/* Table Articles */}
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3">Thumbnail</th>
                <th className="px-6 py-3 w-4">Title</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Created At</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {articles.length > 0 ? (
                articles.map((article) => (
                  <tr key={article.id} className="border-t">
                    <td className="px-6 py-3">
                      <img src={article.imageUrl || '/bg.jpg'} alt={article.title} className="h-12 w-12 object-cover rounded" />
                    </td>
                    <td className="px-6 py-3">{article.title}</td>
                    <td className="px-6 py-3">{article.category?.name ?? '-'}</td>
                    <td className="px-6 py-3">{new Date(article.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-3 flex flex-wrap gap-2">
                      <Link href={`/articles/${article.id}`} className="text-blue-600 hover:underline">
                        Preview
                      </Link>
                      <Link href={`/admin/articles/edit/${article.id}`} className="text-green-600 hover:underline">
                        Edit
                      </Link>
                      <button onClick={() => alert('Confirm delete?')} className="text-red-600 hover:underline">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-6">
                    No articles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 gap-2">
          <button disabled={currentPage <= 1} onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">
            Prev
          </button>
          <span className="px-3 py-1">{currentPage}</span>
          <button disabled={currentPage >= totalPages} onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">
            Next
          </button>
        </div>
      </main>
    </div>
  );
}
