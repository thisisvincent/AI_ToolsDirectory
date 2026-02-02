
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { CategoryContent } from '@/components/CategoryContent';
import { categoriesData } from '@/data/tools-data';

export default function ResearchWritingPage() {
  const category = categoriesData.find(cat => cat.id === 'research-writing');

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <ProtectedRoute>
      <CategoryContent category={category} />
    </ProtectedRoute>
  );
}
