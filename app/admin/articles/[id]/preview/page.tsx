'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/axios';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';

export default function PreviewArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [otherArticles, setOtherArticles] = useState<any[]>([]);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await api.get(`/articles/${id}`);
        setArticle(res.data.data);
      } catch (err) {
        console.error('Failed to fetch article:', err);
      }
    }

    async function fetchOtherArticles() {
      try {
        const res = await api.get('/articles', { params: { limit: 3 } });
        setOtherArticles(res.data.data.filter((a: any) => a.id !== id));
      } catch (err) {
        console.error('Failed to fetch other articles:', err);
      }
    }

    if (id) {
      fetchArticle();
      fetchOtherArticles();
    }
  }, [id]);

  if (!article) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <main className="flex-1 max-w-5xl mx-auto px-4 py-10">
        <p className="text-sm text-gray-400">
          {new Date(article.createdAt).toLocaleDateString()} · Created by {article.user?.username || 'Unknown'}
        </p>
        <h1 className="text-3xl md:text-5xl font-bold mt-2 mb-6">{article.title}</h1>

        <Image src={article.imageUrl || '/bg.jpg'} alt={article.title} width={100} height={100} className="w-full h-auto object-cover rounded mb-6" />

        <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: article.content }} />

        {/* Other Articles */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-6">Other articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {otherArticles.map((item) => (
              <Link href={`/articles/${item.id}`} key={item.id} className="block rounded overflow-hidden shadow hover:shadow-lg transition bg-white">
                <Image src={item.imageUrl || '/bg.jpg'} alt={item.title} width={100} height={100} className="w-full h-36 object-cover" />
                <div className="p-4">
                  <p className="text-xs text-gray-400">{new Date(item.createdAt).toLocaleDateString()}</p>
                  <h3 className="text-md font-semibold mt-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.content?.slice(0, 100)}...</p>
                  <p className="text-sm bg-blue-400 text-black w-fit px-2 rounded-2xl mt-2">{item.category?.name ?? 'Uncategorized'}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
