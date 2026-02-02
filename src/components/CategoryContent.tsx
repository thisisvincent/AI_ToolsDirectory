
'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToolCard } from '@/components/ToolCard';
import { Category } from '@/types/tools';
import { motion } from 'framer-motion';
import { Package } from 'lucide-react';

interface CategoryContentProps {
  category: Category;
}

const categoryImages: Record<string, string> = {
  'research-writing': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
  'academic-ai': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop',
  'tools-by-use-case': 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop'
};

export function CategoryContent({ category }: CategoryContentProps) {
  const [activeTab, setActiveTab] = useState(category.subcategories[0]?.id || '');
  const heroImage = categoryImages[category.id] || categoryImages['research-writing'];

  // Helper function to determine if a tab should have blue styling
  const isBlueTab = (subcategoryId: string) => {
    return subcategoryId === 'new-releases' || subcategoryId === 'google-tools';
  };

  return (
    <div className="w-full">
      {/* Hero Section with Image */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full h-[300px] md:h-[400px] mb-12 rounded-3xl overflow-hidden"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        
        <div className="relative h-full flex flex-col justify-center px-8 md:px-16">
          <motion.h1 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            {category.name}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-200 max-w-2xl"
          >
            {category.description}
          </motion.p>
        </div>
      </motion.div>

      {/* Tabs Section */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="mb-8">
          <TabsList className="w-full flex-wrap h-auto justify-start gap-3 bg-muted/50 p-3 rounded-2xl">
            {category.subcategories.map((subcategory) => (
              <TabsTrigger
                key={subcategory.id}
                value={subcategory.id}
                className={`rounded-xl px-6 py-3 text-sm font-medium transition-all ${
                  isBlueTab(subcategory.id)
                    ? 'data-[state=active]:bg-[#0070C0] data-[state=active]:text-white data-[state=active]:shadow-lg'
                    : 'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg'
                }`}
              >
                {subcategory.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {category.subcategories.map((subcategory) => (
          <TabsContent key={subcategory.id} value={subcategory.id} className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-8 p-6 rounded-2xl bg-card border">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">{subcategory.name}</h2>
                <p className="text-muted-foreground flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  <span>{subcategory.tools.length} tool{subcategory.tools.length !== 1 ? 's' : ''} available</span>
                </p>
              </div>

              {subcategory.tools.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground">
                  <Package className="w-16 h-16 mx-auto mb-4 opacity-20" />
                  <p className="text-lg">No tools available in this category yet.</p>
                  <p className="text-sm mt-2">Check back soon for updates!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {subcategory.tools.map((tool) => (
                    <ToolCard
                      key={tool.id}
                      tool={tool}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
