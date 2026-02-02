
'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { SearchResults } from '@/components/SearchResults';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlQuery = searchParams.get('q') || '';
  const [searchInput, setSearchInput] = useState(urlQuery);
  const [activeQuery, setActiveQuery] = useState(urlQuery);

  useEffect(() => {
    setSearchInput(urlQuery);
    setActiveQuery(urlQuery);
  }, [urlQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setActiveQuery(searchInput.trim());
      router.push(`/search?q=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border rounded-lg p-6 shadow-sm">
        <form onSubmit={handleSearch} className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for AI tools, categories, or use cases..."
              value={searchInput}
              onChange={handleInputChange}
              className="pl-10 h-12 text-base"
              autoFocus
            />
          </div>
          <Button type="submit" size="lg" className="px-8">
            Search
          </Button>
        </form>
        <p className="text-sm text-muted-foreground mt-3">
          Try searching for: "writing", "video", "research", "image generator", etc.
        </p>
      </div>
      <SearchResults query={activeQuery} />
    </div>
  );
}

export default function SearchPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Search AI Tools</h1>
          <p className="text-muted-foreground">
            Find the perfect AI tool for your needs
          </p>
        </div>
        <Suspense fallback={<div className="text-center py-20">Loading search...</div>}>
          <SearchContent />
        </Suspense>
      </div>
    </ProtectedRoute>
  );
}
