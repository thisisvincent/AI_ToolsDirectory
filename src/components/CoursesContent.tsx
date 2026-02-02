
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Clock, Award, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api-client';
import { toast } from 'sonner';
import { FavoriteButton } from '@/components/FavoriteButton';

interface Course {
  id: number;
  title: string;
  provider: string;
  description?: string;
  url?: string;
  duration?: string;
  cost?: string;
  certificate_available?: boolean;
  release_date?: string;
  course_type?: string;
  sort_order?: number;
}

interface CourseModule {
  id: number;
  course_id: number;
  module_number?: number;
  module_title: string;
  module_description?: string;
  duration?: string;
}

export function CoursesContent() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [modules, setModules] = useState<Record<number, CourseModule[]>>({});
  const [loading, setLoading] = useState(true);
  const [expandedCourses, setExpandedCourses] = useState<Set<number>>(new Set());

  const heroImage = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop';

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const data = await api.get<Course[]>('/courses');
      setCourses(data);
    } catch (error) {
      toast.error('Failed to fetch courses');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchModules = async (courseId: number) => {
    if (modules[courseId]) {
      return;
    }
    
    try {
      const data = await api.get<CourseModule[]>('/courses/modules', { course_id: courseId.toString() });
      setModules(prev => ({ ...prev, [courseId]: data }));
    } catch (error) {
      console.error('Failed to fetch modules:', error);
    }
  };

  const toggleCourse = (courseId: number) => {
    const newExpanded = new Set(expandedCourses);
    if (newExpanded.has(courseId)) {
      newExpanded.delete(courseId);
    } else {
      newExpanded.add(courseId);
      fetchModules(courseId);
    }
    setExpandedCourses(newExpanded);
  };

  const groupedCourses = courses.reduce((acc, course) => {
    const provider = course.provider || 'Other';
    if (!acc[provider]) {
      acc[provider] = [];
    }
    acc[provider].push(course);
    return acc;
  }, {} as Record<string, Course[]>);

  const providerOrder = ['IBM', 'GOOGLE', 'MICROSOFT', 'OTHER PROVIDERS'];
  const sortedProviders = Object.keys(groupedCourses).sort((a, b) => {
    const aIndex = providerOrder.indexOf(a.toUpperCase());
    const bIndex = providerOrder.indexOf(b.toUpperCase());
    if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full h-[300px] md:h-[400px] mb-12"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        
        <div className="relative h-full flex flex-col justify-center px-8 md:px-16 container mx-auto max-w-7xl">
          <Link href="/ai-guides-use-case">
            <Button variant="ghost" className="mb-6 gap-2 text-white hover:text-white hover:bg-white/20 w-fit">
              <ArrowLeft className="w-4 h-4" />
              Back to AI Info+Guides & Workflows
            </Button>
          </Link>
          
          <motion.h1 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            AI Certificate Courses
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-200 max-w-2xl"
          >
            Cost – Mostly free. Duration varies from 1 hour for quick introductory courses to 8 weeks for more comprehensive ones.
          </motion.p>
        </div>
      </motion.div>

      {/* Courses Content */}
      <div className="container mx-auto px-4 max-w-7xl pb-20">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : courses.length === 0 ? (
          <div className="bg-card rounded-2xl p-12 text-center border-2 border-dashed border-muted-foreground/30">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <Award className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-3">No Courses Available</h2>
            <p className="text-muted-foreground">
              Courses will be added soon. Check back later!
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {sortedProviders.map((provider, providerIndex) => (
              <motion.div
                key={provider}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: providerIndex * 0.1 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4">
                  <h2 className="text-3xl font-bold uppercase" style={{ color: '#DDDDDD' }}>
                    {provider}
                  </h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#DDDDDD]/50 to-transparent"></div>
                </div>

                <div className="space-y-4">
                  {groupedCourses[provider]?.map((course, courseIndex) => {
                    const isExpanded = expandedCourses.has(course.id);
                    const courseModules = modules[course.id] || [];

                    return (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: courseIndex * 0.05 }}
                        className="bg-card rounded-xl border-2 border-border hover:border-primary/50 transition-all duration-300 overflow-hidden relative"
                      >
                        <div className="p-6">
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <div className="flex-1">
                              <div className="flex items-start gap-2 mb-2">
                                <h3 className="text-xl font-bold flex-1 text-card-foreground">
                                  {course.title}
                                </h3>
                                <FavoriteButton
                                  itemType="course"
                                  itemId={course.id}
                                  itemName={course.title}
                                  itemUrl={course.url}
                                  itemDescription={course.description}
                                  metadata={{
                                    provider: course.provider,
                                    duration: course.duration,
                                    certificate: course.certificate_available,
                                  }}
                                />
                              </div>
                              {course.description && (
                                <p className="text-muted-foreground mb-3 leading-relaxed whitespace-pre-line">
                                  {course.description}
                                </p>
                              )}
                              
                              <div className="flex flex-wrap gap-3 text-sm">
                                {course.duration && (
                                  <div className="flex items-center gap-1.5 text-muted-foreground">
                                    <Clock className="w-4 h-4" />
                                    <span>{course.duration}</span>
                                  </div>
                                )}
                                {course.certificate_available && (
                                  <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
                                    <Award className="w-4 h-4" />
                                    <span>Certificate Available</span>
                                  </div>
                                )}
                                {course.release_date && (
                                  <div className="flex items-center gap-1.5 text-muted-foreground">
                                    <Calendar className="w-4 h-4" />
                                    <span>Released {course.release_date}</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex flex-col gap-2">
                              {course.url && (
                                <a 
                                  href={course.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Button size="sm" className="gap-2">
                                    <ExternalLink className="w-4 h-4" />
                                    View Course
                                  </Button>
                                </a>
                              )}
                              {courseModules.length > 0 && (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => toggleCourse(course.id)}
                                >
                                  {isExpanded ? 'Hide' : 'Show'} Modules
                                </Button>
                              )}
                            </div>
                          </div>

                          {/* Course Modules */}
                          {isExpanded && courseModules.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-4 pt-4 border-t border-border space-y-3"
                            >
                              <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                                Course Modules
                              </h4>
                              {courseModules.map((module) => (
                                <div 
                                  key={module.id}
                                  className="bg-muted/50 rounded-lg p-4 space-y-2"
                                >
                                  <div className="flex items-start justify-between gap-2">
                                    <h5 className="font-semibold text-card-foreground">
                                      {module.module_number && `Module ${module.module_number}: `}
                                      {module.module_title}
                                    </h5>
                                    {module.duration && (
                                      <span className="text-sm text-muted-foreground whitespace-nowrap">
                                        {module.duration}
                                      </span>
                                    )}
                                  </div>
                                  {module.module_description && (
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                      {module.module_description}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
