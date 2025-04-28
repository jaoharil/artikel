import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const ArticleDetail: NextPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 shadow-sm">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full" />
          <span className="font-semibold text-lg">Logipsum</span>
        </Link>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gray-300" />
            <span>Jacob Chen</span>
          </button>
        </div>
      </nav>

      {/* Article Detail */}
      <main className="flex-1 px-4 md:px-20 py-10">
        {/* Meta Info */}
        <div className="text-sm text-gray-500 mb-4">February 6, 2025 · Created by Admin</div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold mb-6">Figma’s New Dev Mode: A Game-Changer for Designers & Developers</h1>

        {/* Hero Image */}
        <div className="w-full h-64 md:h-96 relative mb-8 rounded-lg overflow-hidden">
          <Image
            src="/images/article-hero.jpg" 
            alt="Figma Dev Mode"
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <article className="prose prose-lg max-w-none">
          <p>In today’s world of digital product design, collaboration between designers and developers is crucial. But often the handoff process can create friction and inefficiencies.</p>
          <h2>What’s New in Dev Mode?</h2>
          <ul>
            <li>Streamlined design handoff</li>
            <li>Automatic specs generation</li>
            <li>Developer-friendly annotations</li>
          </ul>
          <p>Figma’s new Dev Mode is built to bridge this gap by providing developers with better visibility into the design process.</p>
          <h2>Key Features of Figma Dev Mode</h2>
          <ul>
            <li>Component and variable inspection</li>
            <li>Code snippets for faster development</li>
            <li>Customizable workflows</li>
          </ul>
          <p>In short, Dev Mode empowers teams to move faster and build better products.</p>
        </article>

        {/* Other articles */}
        <section className="mt-16">
          <h3 className="text-2xl font-bold mb-6">Other articles</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <Link href="/" className="block rounded-lg overflow-hidden shadow hover:shadow-lg transition">
              <div className="relative h-40 w-full">
                <Image src="/images/article1.jpg" alt="Other article 1" fill className="object-cover" />
              </div>
              <div className="p-4">
                <h4 className="font-semibold mb-2">Cryptocurrency Essentials: Every Designer Must Know</h4>
                <p className="text-sm text-gray-500">Feb 5, 2025 · 5 min read</p>
              </div>
            </Link>

            {/* Card 2 */}
            <Link href="/" className="block rounded-lg overflow-hidden shadow hover:shadow-lg transition">
              <div className="relative h-40 w-full">
                <Image src="/images/article2.jpg" alt="Other article 2" fill className="object-cover" />
              </div>
              <div className="p-4">
                <h4 className="font-semibold mb-2">The Future of Work: Remote-First Teams</h4>
                <p className="text-sm text-gray-500">Feb 3, 2025 · 6 min read</p>
              </div>
            </Link>

            {/* Card 3 */}
            <Link href="/" className="block rounded-lg overflow-hidden shadow hover:shadow-lg transition">
              <div className="relative h-40 w-full">
                <Image src="/images/article3.jpg" alt="Other article 3" fill className="object-cover" />
              </div>
              <div className="p-4">
                <h4 className="font-semibold mb-2">Design Systems: Why Your Team Needs One</h4>
                <p className="text-sm text-gray-500">Feb 2, 2025 · 4 min read</p>
              </div>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-6 text-center">© 2025 Logipsum. All rights reserved.</footer>
    </div>
  );
};

export default ArticleDetail;
