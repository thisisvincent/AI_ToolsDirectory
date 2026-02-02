
'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, Zap, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Search,
    title: 'Tools by Use Case',
    description: 'Discover AI tools organized by specific use cases and applications for your needs',
    color: 'from-blue-500 to-cyan-500',
    hasNewBadge: true,
  },
  {
    icon: Zap,
    title: 'All In One Tools For One Subscription',
    description: 'Access comprehensive AI solutions with a single subscription for maximum value',
    color: 'from-purple-500 to-pink-500',
    hasNewBadge: false,
  },
  {
    icon: Code2,
    title: 'Open Source Tools',
    description: 'Explore powerful open source AI tools that you can customize and deploy',
    color: 'from-green-500 to-emerald-500',
    hasNewBadge: false,
  },
];

export function FeatureSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % features.length);
  };

  const currentFeature = features[currentIndex];
  const Icon = currentFeature.icon;

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 md:p-12 shadow-2xl">
        <div className="relative z-10 text-center space-y-6">
          <div className="relative inline-block">
            <div className={`inline-flex p-4 rounded-full bg-gradient-to-br ${currentFeature.color}`}>
              <Icon className="w-12 h-12 text-white" />
            </div>
            
            {/* New Releases Badge */}
            {currentFeature.hasNewBadge && (
              <div className="absolute -top-2 -right-8 md:-right-12">
                <div className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-md shadow-md transform -rotate-12 hover:rotate-0 transition-transform duration-300">
                  <span className="text-white font-bold text-xs">+ New Releases</span>
                </div>
              </div>
            )}
          </div>
          
          <h3 className="text-3xl md:text-4xl font-bold text-white">
            {currentFeature.title}
          </h3>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-lg mx-auto">
            {currentFeature.description}
          </p>
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 pointer-events-none"></div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-6">
        <Button
          variant="outline"
          size="icon"
          onClick={goToPrevious}
          className="rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <div className="flex gap-2">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-primary w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={goToNext}
          className="rounded-full"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
