
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Workflow, GraduationCap, BookOpen } from 'lucide-react';

export function AIGuidesContent() {
  const heroImage = 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop';

  const categories = [
    {
      id: 'use-cases-workflows',
      name: 'Use Cases & Workflows',
      description: 'Real-world applications and workflow examples for AI implementation',
      icon: Workflow,
      gradient: 'from-purple-500/10 to-pink-500/10',
      href: '/ai-guides-use-case/use-cases-workflows',
    },
    {
      id: 'ai-guides',
      name: 'AI Guides',
      description: 'Essential guides and resources for working with AI tools',
      icon: BookOpen,
      gradient: 'from-blue-500/10 to-cyan-500/10',
      href: '/ai-guides-use-case/ai-guides',
    },
    {
      id: 'ai-courses',
      name: 'AI Courses',
      description: 'Structured learning paths and courses to enhance your AI skills',
      icon: GraduationCap,
      gradient: 'from-pink-500/10 to-orange-500/10',
      href: '/courses',
    },
  ];

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
            AI Workflows + AI Guides & AI Courses
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-200 max-w-2xl"
          >
            Explore practical use cases, essential guides and structured courses to master AI technologies
          </motion.p>
        </div>
      </motion.div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 max-w-7xl pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={category.href}>
                  <div className="h-full hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] cursor-pointer group border-2 hover:border-primary/50 overflow-hidden relative bg-card rounded-2xl">
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    
                    <div className="relative z-10 p-6">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-lg">
                        <Icon className="w-10 h-10 text-primary" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold mb-3 text-card-foreground">
                        {category.name}
                      </h2>
                      <p className="text-base leading-relaxed text-muted-foreground mb-6">
                        {category.description}
                      </p>
                      <div className="flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-4 transition-all">
                        <span>Explore</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
