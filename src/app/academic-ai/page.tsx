
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { CategoryContent } from '@/components/CategoryContent';
import { categoriesData } from '@/data/tools-data';

export default function AcademicAIPage() {
  const category = categoriesData.find(cat => cat.id === 'academic-ai');

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <ProtectedRoute>
      <CategoryContent category={category} />
    </ProtectedRoute>
  );
}
