
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { BlogContent } from '@/components/BlogContent';

export default function BlogPage() {
  return (
    <ProtectedRoute>
      <BlogContent />
    </ProtectedRoute>
  );
}
