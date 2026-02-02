
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { CoursesContent } from '@/components/CoursesContent';

export default function CoursesPage() {
  return (
    <ProtectedRoute>
      <CoursesContent />
    </ProtectedRoute>
  );
}
