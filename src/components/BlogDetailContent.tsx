
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowLeft, Loader2, Share2 } from 'lucide-react';
import { api, ApiError } from '@/lib/api-client';
import { toast } from 'sonner';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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

interface BlogDetailContentProps {
  slug: string;
}

// Placeholder images from Unsplash
const placeholderImages = [
  'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&q=80',
  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&q=80',
  'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=80',
];

export function BlogDetailContent({ slug }: BlogDetailContentProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    setLoading(true);
    try {
      const data = await api.get<BlogPost[]>('/blog', { slug });
      if (data && data.length > 0) {
        setPost(data[0]);
      } else {
        toast.error('Blog post not found');
        router.push('/blog');
      }
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(`Failed to fetch blog post: ${error.message}`);
      } else {
        toast.error('An unexpected error occurred');
      }
      router.push('/blog');
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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          text: post?.description,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled share
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading blog post...</p>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  const imageUrl = post.image_url || placeholderImages[post.id % placeholderImages.length];

  return (
    <div className="w-full min-h-screen bg-background">
      {/* Back Button */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-16 z-40">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <Link href="/blog">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>

      {/* Article Content */}
      <article className="container mx-auto px-4 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(post.published_at || post.created_at)}</span>
              </div>
              {post.author_name && (
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>{post.author_name}</span>
                </div>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="gap-2 ml-auto"
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>

            {/* Featured Image */}
            <div className="relative w-full aspect-[21/9] rounded-lg overflow-hidden mb-8 shadow-xl">
              <img
                src={imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Description */}
            <p className="text-xl text-muted-foreground leading-relaxed">
              {post.description}
            </p>
          </header>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="whitespace-pre-wrap leading-relaxed text-foreground">
              {post.content}
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t">
            <div className="flex justify-between items-center">
              <Link href="/blog">
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Blog
                </Button>
              </Link>
              <Button
                variant="default"
                onClick={handleShare}
                className="gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share Article
              </Button>
            </div>
          </footer>
        </motion.div>
      </article>
    </div>
  );
}
