
'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Calendar, User, ArrowRight, Loader2, BookOpen } from 'lucide-react';
import { api, ApiError } from '@/lib/api-client';
import { toast } from 'sonner';
import Link from 'next/link';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  image_url?: string;
  category_id?: number;
  author_name?: string;
  published: boolean;
  featured: boolean;
  view_count?: number;
  published_at?: string;
  created_at?: string;
}

const ITEMS_PER_PAGE = 9;

// Placeholder images from Unsplash
const placeholderImages = [
  'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80',
  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80',
  'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80',
  'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=800&q=80',
  'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80',
  'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&q=80',
];

export function BlogContent() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await api.get<BlogPost[]>('/blog');
      setPosts(data);
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(`Failed to fetch blog posts: ${error.message}`);
      } else {
        toast.error('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  // Filter posts based on search query
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts;
    
    const query = searchQuery.toLowerCase();
    return posts.filter(post => 
      post.title.toLowerCase().includes(query) || 
      post.description.toLowerCase().includes(query)
    );
  }, [posts, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPosts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const getImageUrl = (post: BlogPost, index: number) => {
    return post.image_url || placeholderImages[index % placeholderImages.length];
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="w-full min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-b">
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Blog
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Insights, guides, and updates about AI tools and technology
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search Section */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-16 z-40">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search blog posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-base"
            />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading blog posts...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-2xl font-semibold mb-2">No blog posts found</h3>
            <p className="text-muted-foreground">Try a different search term.</p>
          </motion.div>
        ) : (
          <>
            {/* Blog Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            >
              <AnimatePresence mode="popLayout">
                {paginatedPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    layout
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <Card className="h-full flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 group border-2 hover:border-primary/50 cursor-pointer">
                        {/* Image */}
                        <div className="relative w-full aspect-[16/10] overflow-hidden bg-muted">
                          <img
                            src={getImageUrl(post, index)}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                        </div>

                        <CardContent className="flex-1 flex flex-col p-6">
                          {/* Meta Info */}
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(post.published_at || post.created_at)}</span>
                            </div>
                            {post.author_name && (
                              <div className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                <span>{post.author_name}</span>
                              </div>
                            )}
                          </div>

                          {/* Title */}
                          <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>

                          {/* Description - 3 lines */}
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
                            {post.description}
                          </p>

                          {/* Read More Link */}
                          <div className="flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-4 transition-all">
                            <span>Read more</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex justify-center items-center gap-2"
              >
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className="min-w-[40px]"
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
