import Link from 'next/link';

export default function ArticleCard({ article }: { article: any }) {
  return (
    <Link href={`/articles/${article.id}`} className="block rounded overflow-hidden shadow hover:shadow-lg transition bg-white">
      <img src={article.imageUrl || '/bg.jpg'} alt={article.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        {/* CATEGORY - fix */}
        <p className="text-sm text-gray-500">{article.category?.name ?? 'Uncategorized'}</p>

        {/* TITLE */}
        <h2 className="text-lg font-semibold mt-2">{article.title}</h2>

        {/* CONTENT EXCERPT */}
        <p className="text-sm text-gray-700 mt-1 line-clamp-2">{article.content?.slice(0, 100)}...</p>

        {/* AUTHOR */}
        <p className="text-xs text-gray-400 mt-2">By {article.user?.username ?? 'Unknown'}</p>
      </div>
    </Link>
  );
}
