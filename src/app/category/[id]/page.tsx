
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { categoriesData } from '@/data/tools-data';
import { notFound } from 'next/navigation';
import { CategoryContent } from '@/components/CategoryContent';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { BookOpen, GraduationCap, Layers } from 'lucide-react';

interface CategoryPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return categoriesData.map((category) => ({
    id: category.id,
  }));
}

const iconMap = {
  BookOpen,
  GraduationCap,
  Layers,
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { id } = await params;
  const category = categoriesData.find((cat) => cat.id === id);

  if (!category) {
    notFound();
  }

  const Icon = iconMap[category.icon as keyof typeof iconMap] || BookOpen;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Category Hero */}
        <section className="gradient-bg border-b">
          <div className="container mx-auto px-4 py-12 md:py-16">
            {/* Breadcrumb */}
            <Breadcrumb className="mb-8">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="text-base">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-base font-medium">{category.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {/* Category Header */}
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shadow-lg flex-shrink-0">
                <Icon className="w-10 h-10 md:w-12 md:h-12 text-primary" />
              </div>
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{category.name}</h1>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
                  {category.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Category Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <CategoryContent category={category} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
