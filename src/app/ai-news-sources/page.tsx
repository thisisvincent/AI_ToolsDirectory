
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { AINewsSourcesContent } from '@/components/AINewsSourcesContent';

export default function AINewsSourcesPage() {
  return (
    <ProtectedRoute>
      <AINewsSourcesContent />
    </ProtectedRoute>
  );
}
