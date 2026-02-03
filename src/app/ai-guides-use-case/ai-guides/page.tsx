'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, ArrowRight, Loader2, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

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

export default function AIGuidesPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      console.log('Fetching AI guides from:', '/next_api/blog?author=AI%20Guide');
      const response = await fetch('/next_api/blog?author=AI%20Guide', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response status:', response.status, response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', errorText);
        throw new Error(`Failed to fetch: ${response.status} ${errorText}`);
      }

      const result = await response.json();
      console.log('API result:', result);

      if (result.success && result.data) {
        console.log('Found posts:', result.data.length);
        setPosts(result.data);
      } else {
        console.error('API returned unsuccessful or no data:', result);
        throw new Error(result.errorMessage || 'Failed to fetch posts');
      }
    } catch (error) {
      console.error('Error fetching AI guides:', error);
      toast.error(`Failed to fetch AI guides: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
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
    <ProtectedRoute>
      <div className="w-full min-h-screen bg-background">
        <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-b">
          <div className="container mx-auto px-4 py-16 max-w-7xl">
            <Link href="/ai-guides-use-case">
              <Button variant="ghost" className="mb-6 gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to AI Workflows & AI Courses
              </Button>
            </Link>

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
                AI Guides
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Essential guides and resources for working with AI tools and understanding AI-generated content
              </p>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-7xl">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Loading AI guides...</p>
            </div>
          ) : posts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-2xl font-semibold mb-2">No AI guides found</h3>
              <p className="text-muted-foreground">Check back soon for new guides.</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {posts.map((post, index) => (
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
                        <div className="relative w-full aspect-[16/10] overflow-hidden bg-muted">
                          <img
                            src={post.image_url || 'https://images.pexels.com/photos/8849295/pexels-photo-8849295.jpeg?auto=compress&cs=tinysrgb&w=800'}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                        </div>

                        <CardContent className="flex-1 flex flex-col p-6">
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

                          <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>

                          <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
                            {post.description}
                          </p>

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
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
