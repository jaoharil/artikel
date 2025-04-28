import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import api from '@/lib/axios';
import Link from 'next/link';
import Image from 'next/image';

interface DetailArticlePageProps {
  params: {
    id: string;
  };
}

export default async function DetailArticlePage({ params }: DetailArticlePageProps) {
  const { id } = params;

  let article = null;
  let otherArticles = [];

  try {
    const res = await api.get('/articles');
    const articles = res.data.data;
    article = articles.find((a: any) => a.id === id);
  } catch (err) {
    console.error('Error fetching article:', err);
  }

  try {
    const resOther = await api.get('/articles', { params: { limit: 3 } });
    otherArticles = resOther.data.data;
  } catch (err) {
    console.error('Error fetching other articles:', err);
  }

  if (!article) {
    return <div className="min-h-screen flex items-center justify-center">Article not found.</div>;
  }

  const formattedDate = new Date(article.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Detail Article Section */}
      <main className="flex-1 px-4 md:px-8 py-8 max-w-4xl mx-auto">
        <p className="text-gray-500 text-sm text-center">
          {formattedDate} • Created by {article.user?.username ?? 'Unknown'}
        </p>
        <h1 className="text-2xl md:text-4xl font-bold text-center mt-4">{article.title}</h1>

        <Image src={article.imageUrl || '/bg.jpg'} alt={article.title} width={100} height={100} className="w-full h-64 md:h-96 object-cover rounded-lg my-8" />

        <article className="text-gray-700 leading-relaxed space-y-4">
          {article.content.split('\n').map((paragraph: string, index: number) => (
            <p key={index}>{paragraph}</p>
          ))}
        </article>

        {/* Other Articles */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Other articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherArticles.map((other: any) => (
              <Link key={other.id} href={`/articles/${other.id}`} className="block rounded overflow-hidden shadow hover:shadow-lg transition bg-white">
                <Image src={other.imageUrl || '/default-article.jpg'} alt={other.title} width={100} height={100} className="w-full h-36 object-cover" />
                <div className="p-4">
                  <p className="text-sm text-gray-500 mb-1">{other.category?.name ?? 'Uncategorized'}</p>
                  <h3 className="text-md font-semibold">{other.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
