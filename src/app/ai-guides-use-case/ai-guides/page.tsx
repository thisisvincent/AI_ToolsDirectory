
import { ProtectedRoute } from '@/components/ProtectedRoute';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface GuideEntry {
  title: string;
  description: string;
  links: Array<{
    label: string;
    url: string;
  }>;
}

export default function AIGuidesPage() {
  const guides: GuideEntry[] = [
    {
      title: 'Remove Watermarks & Unicode Text from ChatGPT Output',
      description: 'Tools and methods to clean ChatGPT output by removing watermarks and unicode characters',
      links: [
        {
          label: 'GPT Watermark Detector',
          url: 'https://www.gptwatermark.com/',
        },
        {
          label: 'GetGPT Watermark Tool',
          url: 'https://getgpt.app/watermark',
        },
      ],
    },
    {
      title: 'Signs of AI Writing',
      description: 'Learn to identify characteristics and patterns that indicate AI-generated content',
      links: [
        {
          label: 'Wikipedia: Signs of AI Writing',
          url: 'https://en.m.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing',
        },
      ],
    },
    {
      title: 'Stanford Storm AI',
      description: 'Stanford\'s research tool for AI-powered information synthesis and research',
      links: [
        {
          label: 'Storm AI Platform',
          url: 'https://storm.genie.stanford.edu/',
        },
      ],
    },
    {
      title: 'Prompt Engineering',
      description: 'Comprehensive guide to crafting effective prompts for AI models',
      links: [
        {
          label: 'Kaggle Prompt Engineering Whitepaper',
          url: 'https://www.kaggle.com/whitepaper-prompt-engineering',
        },
      ],
    },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <Link href="/ai-guides-use-case">
            <Button variant="ghost" className="mb-6 gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to AI Workflows & AI Courses
            </Button>
          </Link>

          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">AI Guides</h1>
            <p className="text-lg text-muted-foreground">
              Essential guides and resources for working with AI tools and understanding AI-generated content
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guides.map((guide, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl">{guide.title}</CardTitle>
                  <CardDescription className="text-base">
                    {guide.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {guide.links.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors group"
                      >
                        <ExternalLink className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm font-medium group-hover:text-primary transition-colors">
                          {link.label}
                        </span>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
