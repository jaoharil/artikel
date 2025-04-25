import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Selamat Datang di Article Management</h1>
      <p className="text-gray-600 mb-8 text-lg">Kelola dan baca artikel sesuai peran Anda</p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/login">
          <Button size="lg">
            Masuk sebagai User
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <Link href="/admin/login">
          <Button size="lg" variant="outline">
            Masuk sebagai Admin
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </main>
  );
}
