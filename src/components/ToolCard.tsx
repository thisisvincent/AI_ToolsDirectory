
'use client';

import { useState, useEffect } from 'react';
import { Tool } from '@/types/tools';
import { ExternalLink, Star, Heart } from 'lucide-react';
import { api, ApiError } from '@/lib/api-client';
import { toast } from 'sonner';
import { getCurrentUser } from '@/lib/auth';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ToolCardProps {
  tool: Tool;
  onFavouriteChange?: () => void;
}

export function ToolCard({ tool, onFavouriteChange }: ToolCardProps) {
  const [isFavourite, setIsFavourite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    checkIfFavourite();
  }, [tool.name]);

  const checkIfFavourite = async () => {
    const user = getCurrentUser();
    if (!user) return;

    try {
      const favourites = await api.get<any[]>('/favourites');
      const exists = favourites.some(fav => fav.tool_name === tool.name);
      setIsFavourite(exists);
    } catch (error) {
      // Silently fail - user might not be authenticated
    }
  };

  const toggleFavourite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const user = getCurrentUser();
    if (!user) {
      toast.error('Please log in to add favourites');
      return;
    }

    setIsLoading(true);

    try {
      if (isFavourite) {
        // Remove from favourites
        await api.delete(`/favourites?search=${encodeURIComponent(tool.name)}`);
        setIsFavourite(false);
        toast.success('Removed from favourites');
      } else {
        // Add to favourites
        await api.post('/favourites', {
          tool_name: tool.name,
          tool_category: 'General', // You can pass category if available
          tool_description: tool.useCase,
          tool_url: tool.url,
        });
        setIsFavourite(true);
        toast.success('Added to favourites');
      }

      if (onFavouriteChange) {
        onFavouriteChange();
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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 flex flex-col transition-colors relative">
      {/* Favourite Button */}
      <button
        onClick={toggleFavourite}
        disabled={isLoading}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
        title={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
      >
        <Heart
          className={`w-5 h-5 transition-all ${
            isFavourite
              ? 'fill-[#00B050] text-[#00B050]'
              : 'text-gray-400 hover:text-[#00B050]'
          } ${isLoading ? 'animate-pulse' : ''}`}
        />
      </button>

      <div className="flex items-start justify-between mb-3 pr-10">
        <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex-1">
          {tool.name}
        </h4>
        {(tool.featured || tool.rating) && (
          <div className="flex items-center gap-1 ml-2 flex-shrink-0">
            {[...Array(tool.rating || 5)].map((_, index) => (
              <Star
                key={index}
                className="w-4 h-4 fill-orange-500 text-orange-500"
              />
            ))}
          </div>
        )}
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 flex-1">
        {tool.useCase}
      </p>
      
      <div className="flex items-center justify-between gap-2">
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
        >
          Visit Tool
          <ExternalLink className="w-4 h-4" />
        </a>

        {tool.hasReviewDialog && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline"
                className="text-[#00B050] hover:text-[#009040] border-[#00B050] hover:border-[#009040]"
                size="sm"
              >
                Review & Use Case
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{tool.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 mt-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: '#808080' }}>Use Case:</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {tool.useCase}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: '#808080' }}>Reviews:</h3>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <p className="text-gray-600 dark:text-gray-400 italic">
                      User reviews and ratings will be displayed here.
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: '#808080' }}>Cost:</h3>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <p className="text-gray-600 dark:text-gray-400 italic">
                      Pricing information will be displayed here.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                  >
                    Visit {tool.name}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
