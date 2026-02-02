
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-6 px-4">
          <h1 className="text-6xl font-bold">404</h1>
          <h2 className="text-2xl font-semibold">Page Not Found</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link href="/">
            <Button size="lg">
              Return Home
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
