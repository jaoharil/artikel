import Link from 'next/link';

export default function ArticleCard({ article }: { article: any }) {
  // Format tanggal
  const formattedDate = article.createdAt
    ? new Date(article.createdAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Unknown';

  return (
    <Link href={`/articles/${article.id}`} className="block rounded-3xl overflow-hidden shadow hover:shadow-lg transition bg-white">
      <img src={article.imageUrl || '/bg.jpg'} alt={article.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        {/* DATE */}
        <p className="text-xs text-gray-400">{formattedDate}</p>

        {/* TITLE */}
        <h2 className="text-lg font-semibold mt-2">{article.title}</h2>

        {/* CONTENT EXCERPT */}
        <p className="text-sm text-gray-700 mt-1 line-clamp-2">{article.content?.slice(0, 100)}...</p>

        {/* CATEGORY */}
        <p className="text-sm bg-blue-400 rounded-2xl text-black w-fit px-2 mt-1">{article.category?.name ?? 'Uncategorized'}</p>
      </div>
    </Link>
  );
}
