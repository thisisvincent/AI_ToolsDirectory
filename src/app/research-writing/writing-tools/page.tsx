
import { ProtectedRoute } from '@/components/ProtectedRoute';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ToolCard } from '@/components/ToolCard';
import { categoriesData } from '@/data/tools-data';

export default function WritingToolsPage() {
  const category = categoriesData.find(cat => cat.id === 'research-writing');
  const subcategory = category?.subcategories?.find(sub => sub.id === 'writing-tools');

  if (!subcategory) {
    return <div>Subcategory not found</div>;
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <Link href="/research-writing">
            <Button variant="ghost" className="mb-6 gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Research & Writing
            </Button>
          </Link>

          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{subcategory.name}</h1>
            <p className="text-lg text-muted-foreground">
              Explore {subcategory.tools.length} tools in this category
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subcategory.tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
