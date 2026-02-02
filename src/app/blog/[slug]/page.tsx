
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { BlogDetailContent } from '@/components/BlogDetailContent';

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  
  return (
    <ProtectedRoute>
      <BlogDetailContent slug={slug} />
    </ProtectedRoute>
  );
}
