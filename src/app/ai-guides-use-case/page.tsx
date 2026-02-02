
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { AIGuidesContent } from '@/components/AIGuidesContent';

export default function AIGuidesUseCasePage() {
  return (
    <ProtectedRoute>
      <AIGuidesContent />
    </ProtectedRoute>
  );
}
