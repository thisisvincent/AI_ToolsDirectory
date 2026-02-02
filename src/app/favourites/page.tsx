
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { FavouritesContent } from '@/components/FavouritesContent';

export default function FavouritesPage() {
  return (
    <ProtectedRoute>
      <FavouritesContent />
    </ProtectedRoute>
  );
}
