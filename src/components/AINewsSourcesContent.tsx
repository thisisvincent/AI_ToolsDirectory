
'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, ExternalLink, ChevronLeft, ChevronRight, Loader2, Globe } from 'lucide-react';
import { api, ApiError } from '@/lib/api-client';
import { toast } from 'sonner';

interface AINewsSource {
  id: number;
  name: string;
  url: string;
  description: string;
  thumbnail_url?: string;
  category?: string;
  badges?: string[];
  featured?: boolean;
  sort_order?: number;
  last_updated?: string;
  created_at?: string;
}

const ITEMS_PER_PAGE = 12;

// Generate screenshot URL using a screenshot service
const getScreenshotUrl = (url: string) => {
  // Using screenshot.rocks API for website screenshots
  // Alternative services: screenshotapi.net, apiflash.com, screenshotone.com
  const encodedUrl = encodeURIComponent(url);
  return `https://image.thum.io/get/width/800/crop/600/noanimate/${encodedUrl}`;
};

// Placeholder thumbnail generator
const getPlaceholderThumbnail = (name: string) => {
  const colors = [
    'from-blue-500 to-purple-600',
    'from-purple-500 to-pink-600',
    'from-pink-500 to-orange-600',
    'from-orange-500 to-yellow-600',
    'from-green-500 to-teal-600',
    'from-teal-500 to-cyan-600',
  ];
  const colorIndex = name.length % colors.length;
  return colors[colorIndex];
};

export function AINewsSourcesContent() {
  const [sources, setSources] = useState<AINewsSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('sort_order');
  const [currentPage, setCurrentPage] = useState(1);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const [imageLoading, setImageLoading] = useState<Set<number>>(new Set());

  useEffect(() => {
    fetchSources();
  }, [selectedCategory, sortBy]);

  const fetchSources = async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = {};
      if (selectedCategory !== 'all') {
        params.category = selectedCategory;
      }
      if (sortBy) {
        params.sortBy = sortBy;
      }
      
      const data = await api.get<AINewsSource[]>('/ai-news-sources', params);
      setSources(data);
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(`Failed to fetch sources: ${error.message}`);
      } else {
        toast.error('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  // Filter sources based on search query
  const filteredSources = useMemo(() => {
    if (!searchQuery.trim()) return sources;
    
    const query = searchQuery.toLowerCase();
    return sources.filter(source => 
      source.name.toLowerCase().includes(query) || 
      source.description.toLowerCase().includes(query)
    );
  }, [sources, searchQuery]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(sources.map(s => s?.category).filter(Boolean) as string[]);
    return ['all', ...Array.from(cats)];
  }, [sources]);

  // Pagination
  const totalPages = Math.ceil(filteredSources.length / ITEMS_PER_PAGE);
  const paginatedSources = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredSources.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredSources, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, sortBy]);

  const handleImageError = (id: number) => {
    setImageErrors(prev => new Set(prev).add(id));
    setImageLoading(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const handleImageLoad = (id: number) => {
    setImageLoading(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const handleImageLoadStart = (id: number) => {
    setImageLoading(prev => new Set(prev).add(id));
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 7;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const lastUpdated = sources.length > 0 
    ? new Date(Math.max(...sources.map(s => new Date(s?.last_updated || s?.created_at || Date.now()).getTime())))
    : new Date();

  return (
    <div className="w-full min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-b">
        <div className="container mx-auto px-4 py-12 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              AI News and Updates Source Directory
            </h1>
            <p className="text-lg text-muted-foreground mb-2">
              A curated list of newsletters, tool directories, and tech publications covering AI.
            </p>
            <p className="text-sm text-muted-foreground">
              Last updated: {lastUpdated.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-16 z-40">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort Dropdown */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sort_order">Most Relevant</SelectItem>
                <SelectItem value="name_asc">A to Z</SelectItem>
                <SelectItem value="name_desc">Z to A</SelectItem>
                <SelectItem value="newest">Newest Added</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredSources.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-2xl font-semibold mb-2">No sources match your search</h3>
            <p className="text-muted-foreground">Try a different keyword or filter.</p>
          </motion.div>
        ) : (
          <>
            {/* Cards Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            >
              <AnimatePresence mode="popLayout">
                {paginatedSources.map((source, index) => {
                  const screenshotUrl = getScreenshotUrl(source.url);
                  const hasError = imageErrors.has(source.id);
                  const isLoading = imageLoading.has(source.id);

                  return (
                    <motion.div
                      key={source.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      layout
                    >
                      <Card className="h-full flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 group border-2 hover:border-primary/50">
                        {/* Thumbnail */}
                        <div 
                          className="relative w-full aspect-[16/10] overflow-hidden bg-muted cursor-pointer"
                          onClick={() => window.open(source.url, '_blank')}
                        >
                          {!hasError ? (
                            <>
                              {isLoading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                                  <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                                </div>
                              )}
                              <img
                                src={screenshotUrl}
                                alt={`Screenshot of ${source.name}`}
                                loading="lazy"
                                onLoadStart={() => handleImageLoadStart(source.id)}
                                onLoad={() => handleImageLoad(source.id)}
                                onError={() => handleImageError(source.id)}
                                className={`w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                                style={{ imageRendering: 'crisp-edges' }}
                              />
                            </>
                          ) : (
                            <div className={`w-full h-full bg-gradient-to-br ${getPlaceholderThumbnail(source.name)} flex items-center justify-center`}>
                              <div className="text-center p-6">
                                <Globe className="w-12 h-12 mx-auto mb-2 text-white/80" />
                                <p className="text-white font-semibold text-lg line-clamp-2">{source.name}</p>
                              </div>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                          
                          {/* Border overlay for consistent look */}
                          <div className="absolute inset-0 border-b-2 border-border pointer-events-none" />
                        </div>

                        <CardContent className="flex-1 flex flex-col p-6">
                          {/* Badges */}
                          {source.badges && source.badges.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-3">
                              {source.badges.slice(0, 3).map((badge, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {badge}
                                </Badge>
                              ))}
                            </div>
                          )}

                          {/* Site Name */}
                          <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                            {source.name}
                          </h3>

                          {/* Description */}
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
                            {source.description}
                          </p>

                          {/* View More Button */}
                          <Button
                            variant="default"
                            className="w-full group/btn bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                            onClick={() => window.open(source.url, '_blank')}
                          >
                            <span>View more</span>
                            <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex justify-center items-center gap-2 flex-wrap"
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="gap-1 rounded-md"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>

                {getPageNumbers().map((page, idx) => (
                  page === '...' ? (
                    <span key={`ellipsis-${idx}`} className="px-2 text-muted-foreground">
                      ...
                    </span>
                  ) : (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(page as number)}
                      className={`min-w-[40px] rounded-md ${
                        currentPage === page 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-muted'
                      }`}
                      aria-label={`Page ${page}`}
                      aria-current={currentPage === page ? 'page' : undefined}
                    >
                      {page}
                    </Button>
                  )
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="gap-1 rounded-md"
                  aria-label="Next page"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
