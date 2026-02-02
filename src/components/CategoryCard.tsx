
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, GraduationCap, Layers, LucideIcon, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface CategoryCardProps {
  id: string;
  name: string;
  description: string;
  icon: string;
  index: number;
}

// Custom Research Writing Icon Component - Updated to match screenshot
const ResearchWritingIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Laptop Screen */}
    <rect x="30" y="15" width="60" height="40" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="2.5" rx="3"/>
    {/* Laptop Base */}
    <path d="M25 55 L95 55 L100 62 L20 62 Z" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="2"/>
    {/* Screen Lines */}
    <line x1="38" y1="25" x2="82" y2="25" stroke="currentColor" strokeWidth="2" opacity="0.6"/>
    <line x1="38" y1="33" x2="82" y2="33" stroke="currentColor" strokeWidth="2" opacity="0.6"/>
    <line x1="38" y1="41" x2="70" y2="41" stroke="currentColor" strokeWidth="2" opacity="0.6"/>
    
    {/* Open Book - Left Page */}
    <path d="M15 70 Q15 65 20 65 L35 65 L35 95 L20 95 Q15 95 15 90 Z" 
          fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="2.5"/>
    {/* Open Book - Right Page */}
    <path d="M35 65 L50 65 Q55 65 55 70 L55 90 Q55 95 50 95 L35 95 Z" 
          fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="2.5"/>
    {/* Book Lines - Left */}
    <line x1="19" y1="73" x2="31" y2="73" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
    <line x1="19" y1="79" x2="31" y2="79" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
    <line x1="19" y1="85" x2="31" y2="85" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
    {/* Book Lines - Right */}
    <line x1="39" y1="73" x2="51" y2="73" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
    <line x1="39" y1="79" x2="51" y2="79" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
    <line x1="39" y1="85" x2="51" y2="85" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
    
    {/* Magnifying Glass - Circle */}
    <circle cx="75" cy="80" r="12" fill="none" stroke="currentColor" strokeWidth="2.5"/>
    {/* Magnifying Glass - Handle */}
    <line x1="84" y1="89" x2="93" y2="98" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    {/* Magnifying Glass - Inner Detail */}
    <circle cx="75" cy="80" r="7" fill="currentColor" opacity="0.1"/>
    
    {/* Paper/Document with Lines */}
    <rect x="60" y="95" width="20" height="15" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="2" rx="1"/>
    <line x1="63" y1="100" x2="77" y2="100" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
    <line x1="63" y1="105" x2="77" y2="105" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
    
    {/* Pen 1 */}
    <line x1="85" y1="100" x2="90" y2="110" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <polygon points="85,100 86.5,97 87.5,100" fill="currentColor"/>
    <circle cx="87.5" cy="105" r="1" fill="currentColor" opacity="0.5"/>
    
    {/* Pen 2 */}
    <line x1="93" y1="100" x2="98" y2="110" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <polygon points="93,100 94.5,97 95.5,100" fill="currentColor"/>
    <circle cx="95.5" cy="105" r="1" fill="currentColor" opacity="0.5"/>
    
    {/* Highlighter/Marker */}
    <rect x="102" y="100" width="3" height="10" fill="currentColor" opacity="0.6" rx="0.5"/>
    <rect x="102" y="98" width="3" height="2" fill="currentColor" opacity="0.8"/>
  </svg>
);

const iconMap: Record<string, LucideIcon | React.ComponentType<{ className?: string }>> = {
  BookOpen,
  GraduationCap,
  Layers,
  ResearchWriting: ResearchWritingIcon,
};

const gradients = [
  'from-blue-500/10 to-purple-500/10',
  'from-purple-500/10 to-pink-500/10',
  'from-pink-500/10 to-orange-500/10',
];

export function CategoryCard({ id, name, description, icon, index }: CategoryCardProps) {
  const Icon = iconMap[icon] || BookOpen;
  const gradient = gradients[index % gradients.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/category/${id}`}>
        <Card className={`h-full hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] cursor-pointer group border-2 hover:border-primary/50 overflow-hidden relative`}>
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
          
          <CardHeader className="relative z-10 pb-4">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-lg">
              <Icon className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="text-2xl md:text-3xl mb-3">{name}</CardTitle>
            <CardDescription className="text-base leading-relaxed">{description}</CardDescription>
          </CardHeader>
          
          <CardContent className="relative z-10">
            <div className="flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-4 transition-all">
              <span>Explore tools</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
