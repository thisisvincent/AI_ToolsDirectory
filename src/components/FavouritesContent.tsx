
'use client';

import { useState, useEffect } from 'react';
import { ToolCard } from '@/components/ToolCard';
import { api, ApiError } from '@/lib/api-client';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Heart, Loader2 } from 'lucide-react';

interface FavouriteTool {
  id: number;
  user_id: number;
  tool_name: string;
  tool_category: string;
  tool_description: string;
  tool_url: string;
  tool_image_url?: string;
  created_at: string;
}

export function FavouritesContent() {
  const [favourites, setFavourites] = useState<FavouriteTool[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFavourites = async () => {
    setLoading(true);
    try {
      const data = await api.get<FavouriteTool[]>('/favourites');
      setFavourites(data);
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(`Failed to fetch favourites: ${error.message}`);
      } else {
        toast.error('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavourites();
  }, []);

  const handleFavouriteRemoved = () => {
    fetchFavourites();
  };

  return (
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10 py-20 mb-12"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00B050] to-emerald-600 flex items-center justify-center mb-6 shadow-lg">
              <Heart className="w-10 h-10 text-white fill-white" />
            </div>
            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            >
              My Favourites
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl"
            >
              Your curated collection of AI tools
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Content Section */}
      <div className="container mx-auto px-4 md:px-6 pb-20">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading your favourites...</p>
          </div>
        ) : favourites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center py-20"
          >
            <Heart className="w-24 h-24 mx-auto mb-6 text-muted-foreground/20" />
            <h2 className="text-2xl font-bold mb-3">No favourites yet</h2>
            <p className="text-muted-foreground mb-8">
              Start adding tools to your favourites by clicking the heart icon on any tool card
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mb-8">
              <p className="text-muted-foreground flex items-center gap-2">
                <Heart className="w-4 h-4 fill-[#00B050] text-[#00B050]" />
                <span>{favourites.length} favourite{favourites.length !== 1 ? 's' : ''}</span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favourites.map((favourite) => (
                <ToolCard
                  key={favourite.id}
                  tool={{
                    id: favourite.id.toString(),
                    name: favourite.tool_name,
                    useCase: favourite.tool_description,
                    url: favourite.tool_url,
                  }}
                  onFavouriteChange={handleFavouriteRemoved}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
