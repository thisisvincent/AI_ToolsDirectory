
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { CategoryContent } from '@/components/CategoryContent';
import { categoriesData } from '@/data/tools-data';

export default function ToolsByUseCasePage() {
  const category = categoriesData.find(cat => cat.id === 'tools-by-use-case');

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <ProtectedRoute>
      <CategoryContent category={category} />
    </ProtectedRoute>
  );
}
