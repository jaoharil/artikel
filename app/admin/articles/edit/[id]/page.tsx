'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AdminSidebar from '@/components/layout/AdminSidebar';
import AdminHeader from '@/components/layout/AdminHeader';
import api from '@/lib/axios';
import Link from 'next/link';
import Image from 'next/image';

export default function EditArticlePage() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await api.get(`/articles/${id}`);
        const article = res.data?.data;

        if (!article) {
          alert('Article not found!');
          return;
        }

        setTitle(article.title);
        setContent(article.content);
        setCategoryId(article.categoryId);
        setImageUrl(article.imageUrl || '');
      } catch (err) {
        console.error('Failed to fetch article:', err);
        alert('Failed to fetch article.');
      }
    }

    async function fetchCategories() {
      try {
        const res = await api.get('/categories');
        setCategories(res.data.data);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    }

    fetchArticle();
    fetchCategories();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put(`/articles/${id}`, {
        title,
        content,
        categoryId,
        imageUrl,
      });

      alert('Article updated successfully!');
      router.push('/admin/articles');
    } catch (err: any) {
      console.error('Error updating article:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Failed to update article');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-6">
        <AdminHeader title="Edit Articles" />

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
          {/* Thumbnail */}
          <div className="mb-4">
            <label className="text-sm font-medium block mb-2">Thumbnails</label>
            {imageUrl ? (
              <div className="flex items-center gap-4">
                <Image src={imageUrl} alt="Thumbnail" className="h-20 w-32 object-cover rounded" />
                {/* Tombol ganti thumbnail */}
                <button type="button" onClick={() => setImageUrl('')} className="text-red-500 text-sm underline">
                  Change
                </button>
              </div>
            ) : (
              <input type="text" placeholder="Input image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full border rounded px-4 py-2" />
            )}
          </div>

          {/* Title */}
          <div className="mb-4">
            <label className="text-sm font-medium block mb-2">Title</label>
            <input type="text" placeholder="Input title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border rounded px-4 py-2" />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="text-sm font-medium block mb-2">Category</label>
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="w-full border rounded px-4 py-2">
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              The existing category list can be seen in the{' '}
              <Link href="/admin/categories" className="text-blue-600 underline">
                category
              </Link>{' '}
              menu.
            </p>
          </div>

          {/* Content */}
          <div className="mb-4">
            <label className="text-sm font-medium block mb-2">Content</label>
            <textarea placeholder="Type a content..." value={content} onChange={(e) => setContent(e.target.value)} className="w-full border rounded px-4 py-2 h-60" />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <Link href="/admin/articles">
              <button type="button" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                Cancel
              </button>
            </Link>
            <button type="button" onClick={() => alert('Feature coming soon!')} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
              Preview
            </button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              {loading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
