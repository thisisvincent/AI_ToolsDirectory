
import { ProtectedRoute } from '@/components/ProtectedRoute';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { notFound, redirect } from 'next/navigation';

interface AIGuidesSubcategoryPageProps {
  params: Promise<{
    subcategoryId: string;
  }>;
}

export default async function AIGuidesSubcategoryPage({
  params,
}: AIGuidesSubcategoryPageProps) {
  const { subcategoryId } = await params;
  
  // Redirect ai-guides to the dedicated page
  if (subcategoryId === 'ai-guides') {
    redirect('/ai-guides-use-case/ai-guides');
  }
  
  const subcategories: Record<string, { name: string; description: string }> = {
    'use-cases-workflows': {
      name: 'Use Cases & Workflows',
      description: 'Real-world applications and workflow examples for AI implementation',
    },
    'ai-courses': {
      name: 'AI Courses',
      description: 'Structured learning paths and courses to enhance your AI skills',
    },
  };

  const subcategory = subcategories[subcategoryId];

  if (!subcategory) {
    notFound();
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <Link href="/ai-guides-use-case">
            <Button variant="ghost" className="mb-6 gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to AI Workflows & AI Courses
            </Button>
          </Link>

          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{subcategory.name}</h1>
            <p className="text-lg text-muted-foreground">
              {subcategory.description}
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 border-2 border-dashed border-muted-foreground/30">
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="w-12 h-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-3">Content Coming Soon</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                We're currently curating high-quality content for this section. Check back soon for comprehensive guides, use cases, and courses.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
