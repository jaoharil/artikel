'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/axios';
import AdminSidebar from '@/components/layout/AdminSidebar';
import AdminHeader from '@/components/layout/AdminHeader';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await api.get('/articles', {
          params: { page: currentPage, search, category },
        });
        setArticles(res.data.data);
        setTotalPages(res.data.meta?.last_page || 1);
      } catch (err) {
        console.error(err);
      }
    }
    fetchArticles();
  }, [search, category, currentPage]);

  const handleDelete = async () => {
    if (!selectedId) return;

    try {
      await api.delete(`/articles/${selectedId}`);
      setArticles((prev) => prev.filter((article) => article.id !== selectedId));
      setShowDeleteModal(false);
    } catch (err) {
      console.error('Failed to delete article:', err);
      alert('Failed to delete article');
    }
  };

  return (
    <div className="min-h-screen flex">
      <AdminSidebar />

      <main className="flex-1 bg-gray-50 p-6">
        <AdminHeader title="Articles" />

        {/* Filter */}
        <p className="mb-4">Total Articles: {articles.length}</p>
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2">
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="border px-4 py-2 rounded">
              <option value="">Category</option>
              <option value="technology">Technology</option>
              <option value="design">Design</option>
            </select>
            <input type="text" placeholder="Search title" value={search} onChange={(e) => setSearch(e.target.value)} className="border px-4 py-2 rounded" />
          </div>
          <Link href="/admin/articles/add">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">+ Add Articles</button>
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Thumbnails</th>
                <th className="p-2">Title</th>
                <th className="p-2">Category</th>
                <th className="p-2">Created</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id} className="border-t">
                  <td className="p-2">
                    <Image src={article.imageUrl || '/bg.jpg'} alt={article.title} width={100} height={100} className="h-12 w-12 object-cover rounded" />
                  </td>
                  <td className="p-2 w-3/12">{article.title}</td>
                  <td className="p-2">{article.category?.name || '-'}</td>
                  <td className="p-2">{new Date(article.createdAt).toLocaleString()}</td>
                  <td className="p-2 space-x-2">
                    <Link href={`/articles/${article.id}`} className="text-blue-500 hover:underline">
                      Preview
                    </Link>
                    <Link href={`/admin/articles/edit/${article.id}`} className="text-green-500 hover:underline">
                      Edit
                    </Link>
                    <button
                      onClick={() => {
                        setSelectedId(article.id);
                        setShowDeleteModal(true);
                      }}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center  justify-center  bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg  w-auto">
            <h2 className="text-lg font-semibold mb-2">Delete Articles</h2>
            <p className="text-gray-600 mb-6 text-sm">
              Deleting this article is permanent and cannot be undone. <br /> All related content will be removed.
            </p>
            <div className="flex justify-end gap-4">
              <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                Cancel
              </button>
              <button onClick={handleDelete} className="px-4 py-2 bg-[#DC2626] text-white rounded hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
