// components/articles/ArticleCard.tsx
import Link from 'next/link';

export default function ArticleCard({ article }: { article: any }) {
  return (
    <Link href={`/articles/${article.slug}`} className="block border p-4 rounded shadow hover:shadow-md">
      <h2 className="text-lg font-semibold">{article.title}</h2>
      <p className="text-sm text-gray-600 mt-2 line-clamp-3">{article.content}</p>
    </Link>
  );
}
