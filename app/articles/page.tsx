'use client';

import { useEffect, useState } from 'react';
import useDebounce from '@/lib/hooks/useDebounce';
import { fetchArticles } from '@/lib/api';
import ArticleCard from '@/components/articles/ArticleCard';

export default function ArticlesPage() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 400);
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      try {
        const res = await fetchArticles({
          search: debouncedSearch,
        });
        setArticles(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadArticles();
  }, [debouncedSearch]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">List Artikel</h1>

      <input type="text" placeholder="Cari artikel..." className="w-full border rounded px-4 py-2 mb-6" value={search} onChange={(e) => setSearch(e.target.value)} />

      {loading ? (
        <p>Loading...</p>
      ) : articles.length === 0 ? (
        <p>Tidak ada artikel ditemukan.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
