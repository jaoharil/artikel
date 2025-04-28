'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/layout/AdminSidebar';
import AdminHeader from '@/components/layout/AdminHeader';
import api from '@/lib/axios';
import Link from 'next/link';

export default function AdminAddArticlePage() {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState<any[]>([]);
  const [categoryId, setCategoryId] = useState('');

  useEffect(() => {
    // Fetch categories
    async function fetchCategories() {
      try {
        const res = await api.get('/categories');
        setCategories(res.data.data || []);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    }
    fetchCategories();
  }, []);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content || !categoryId) {
      alert('Please fill all fields');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user.id;

    if (!userId) {
      alert('User not found, please login again.');
      return;
    }

    try {
      const payload = {
        title,
        content,
        userId,
        categoryId,
        imageUrl: '', // kalau mau support upload nanti beda lagi
      };

      await api.post('/articles', payload); // 🔥 kirim JSON, bukan FormData!

      alert('Article uploaded successfully!');
      window.location.href = '/admin/articles';
    } catch (err: any) {
      console.error('Error uploading article:', err);

      const msg = err?.response?.data?.message || err?.response?.data?.error || err.message || 'Failed to upload article';

      alert(msg);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-6">
        {/* Header */}
        <AdminHeader title="Create Articles" />

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mt-4 space-y-6">
          {/* Thumbnail */}
          <div>
            <label className="block text-sm font-medium mb-2">Thumbnails</label>
            <div className="border border-dashed border-gray-400 p-6 rounded text-center cursor-pointer">
              <input type="file" accept="image/*" onChange={handleThumbnailChange} className="hidden" id="thumbnail" />
              <label htmlFor="thumbnail" className="block cursor-pointer">
                {previewImage ? (
                  <img src={previewImage} alt="Thumbnail Preview" className="mx-auto h-32 object-cover" />
                ) : (
                  <div className="text-gray-400">
                    <p>📷</p>
                    <p>Click to select file</p>
                    <p className="text-xs">Support file type: jpg, jpeg, png</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border rounded px-4 py-2" placeholder="Input title" />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="w-full border rounded px-4 py-2">
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <p className="text-xs mt-1">
              The existing category list can be seen in the{' '}
              <Link href="/admin/categories" className="text-blue-600 underline">
                category
              </Link>{' '}
              menu.
            </p>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium mb-2">Content</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-full h-64 border rounded px-4 py-2 resize-none" placeholder="Type a content..." />
            <div className="text-xs text-right mt-1">{content.trim().split(/\s+/).filter(Boolean).length} Words</div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <Link href="/admin/articles">
              <button type="button" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                Cancel
              </button>
            </Link>
            <button type="button" className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500" onClick={() => alert('Preview not available yet')}>
              Preview
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Upload
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
