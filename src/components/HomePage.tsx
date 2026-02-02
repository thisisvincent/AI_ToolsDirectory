
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm } from '@/components/LoginForm';
import { FeatureSlider } from '@/components/FeatureSlider';
import { initializeAuth, isAuthenticated } from '@/lib/auth';

export function HomePage() {
  const router = useRouter();

  useEffect(() => {
    initializeAuth();
    
    if (isAuthenticated()) {
      router.push('/directory');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0f1729]">
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl">
          {/* Hero Section */}
          <div className="relative text-center mb-12 overflow-hidden rounded-3xl bg-[#0f1729] p-8 md:p-12">
            {/* Content */}
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
              {/* Animated Graphic */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0">
                {/* Central AI Brain/Chip */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Animated Outer Rings */}
                  <div className="absolute w-full h-full border-4 border-blue-400/30 rounded-full animate-spin-slow"></div>
                  <div className="absolute w-[90%] h-[90%] border-4 border-blue-500/30 rounded-full animate-spin-reverse"></div>
                  
                  {/* Central Hexagon Chip */}
                  <div className="relative w-32 h-32 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 transform rotate-0 flex items-center justify-center shadow-2xl shadow-blue-500/50 animate-pulse">
                    <div className="absolute inset-2 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-500"></div>
                    <div className="absolute inset-4 bg-slate-900 flex items-center justify-center">
                      <svg className="w-16 h-16 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    {/* Corner Circuit Nodes */}
                    <div className="absolute -top-2 -left-2 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full animate-pulse animation-delay-1000"></div>
                    <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-blue-600 rounded-full animate-pulse animation-delay-2000"></div>
                    <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-blue-400 rounded-full animate-pulse animation-delay-3000"></div>
                  </div>

                  {/* Animated Data Nodes */}
                  <div className="absolute w-full h-full animate-spin-slow">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-red-500 to-orange-500 rounded-full shadow-lg shadow-red-400/50 animate-pulse"></div>
                  </div>
                  <div className="absolute w-full h-full animate-spin-reverse">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full shadow-lg shadow-yellow-400/50 animate-pulse animation-delay-1000"></div>
                  </div>
                  <div className="absolute w-full h-full animate-spin-slow">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full shadow-lg shadow-blue-400/50 animate-pulse animation-delay-2000"></div>
                  </div>
                  <div className="absolute w-full h-full animate-spin-reverse">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full shadow-lg shadow-amber-400/50 animate-pulse animation-delay-3000"></div>
                  </div>
                </div>

                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="line-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.8" />
                    </linearGradient>
                    <linearGradient id="line-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>
                  <line x1="20%" y1="20%" x2="50%" y2="50%" stroke="url(#line-gradient-1)" strokeWidth="2" />
                  <line x1="80%" y1="20%" x2="50%" y2="50%" stroke="url(#line-gradient-1)" strokeWidth="2" />
                  <line x1="20%" y1="80%" x2="50%" y2="50%" stroke="url(#line-gradient-2)" strokeWidth="2" />
                  <line x1="80%" y1="80%" x2="50%" y2="50%" stroke="url(#line-gradient-2)" strokeWidth="2" />
                </svg>
              </div>

              {/* Text Content */}
              <div className="flex-1 text-left md:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-2xl">
                  <span className="text-white">The </span>
                  <span className="text-[#3b82f6]">Best </span>
                  <span className="text-white">AI </span>
                  <span className="text-[#3b82f6]">Tools</span>
                </h1>
                
                <p className="text-lg md:text-xl text-white/95 max-w-2xl mb-6 drop-shadow-lg">
                  AI-powered solutions for research, writing, academic excellence and media production
                </p>

                {/* Feature Badges */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-medium backdrop-blur-sm">
                    🚀 500+ Tools
                  </div>
                  <div className="px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-medium backdrop-blur-sm">
                    ⚡ 15+ Categories
                  </div>
                  <div className="px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-medium backdrop-blur-sm">
                    ✨ Curated
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Wave Effect */}
            <div className="absolute bottom-0 left-0 right-0">
              <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12">
                <path d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z" 
                      className="fill-[#0f1729]"></path>
              </svg>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <FeatureSlider />
            </div>

            <div className="order-1 md:order-2">
              <LoginForm />
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-lg bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-gray-300">AI Tools Listed</div>
            </div>
            <div className="p-6 rounded-lg bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm">
              <div className="text-4xl font-bold text-primary mb-2">15+</div>
              <div className="text-sm text-gray-300">Categories</div>
            </div>
            <div className="p-6 rounded-lg bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm">
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm text-gray-300">Curated Content</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
