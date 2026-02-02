'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { api, ApiError } from '@/lib/api-client';
import { toast } from 'sonner';
import { getCurrentUser } from '@/lib/auth';

interface FavoriteButtonProps {
  itemType: 'tool' | 'blog' | 'news' | 'course';
  itemId: string | number;
  itemName: string;
  itemUrl?: string;
  itemDescription?: string;
  itemImageUrl?: string;
  metadata?: Record<string, any>;
  onFavoriteChange?: (isFavorite: boolean) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function FavoriteButton({
  itemType,
  itemId,
  itemName,
  itemUrl,
  itemDescription,
  itemImageUrl,
  metadata = {},
  onFavoriteChange,
  className = '',
  size = 'md',
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  useEffect(() => {
    checkIfFavorite();
  }, [itemType, itemId]);

  const checkIfFavorite = async () => {
    const user = getCurrentUser();
    if (!user) return;

    try {
      const favourites = await api.get<any[]>('/next_api/favourites/unified');
      const exists = favourites.some(
        fav => fav.item_type === itemType && fav.item_id === String(itemId)
      );
      setIsFavorite(exists);
    } catch (error) {
      console.error('Failed to check favorite status:', error);
    }
  };

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const user = getCurrentUser();
    if (!user) {
      toast.error('Please log in to add favourites');
      return;
    }

    setIsLoading(true);

    try {
      if (isFavorite) {
        await api.delete(`/next_api/favourites/unified?item_type=${itemType}&item_id=${itemId}`);
        setIsFavorite(false);
        toast.success('Removed from favourites');
        onFavoriteChange?.(false);
      } else {
        await api.post('/next_api/favourites/unified', {
          item_type: itemType,
          item_id: String(itemId),
          item_name: itemName,
          item_url: itemUrl,
          item_description: itemDescription,
          item_image_url: itemImageUrl,
          metadata,
        });
        setIsFavorite(true);
        toast.success('Added to favourites');
        onFavoriteChange?.(true);
      }
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error('Failed to update favourites');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      disabled={isLoading}
      className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 ${className}`}
      title={isFavorite ? 'Remove from favourites' : 'Add to favourites'}
      aria-label={isFavorite ? 'Remove from favourites' : 'Add to favourites'}
    >
      <Heart
        className={`${sizeClasses[size]} transition-all ${
          isFavorite
            ? 'fill-[#00B050] text-[#00B050]'
            : 'text-gray-400 hover:text-[#00B050]'
        } ${isLoading ? 'animate-pulse' : ''}`}
      />
    </button>
  );
}
