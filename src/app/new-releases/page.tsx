
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { CategoryContent } from '@/components/CategoryContent';
import { Category } from '@/types/tools';

export default function NewReleasesPage() {
  // Define the New Releases category with the tools from tools-by-use-case
  const newReleasesCategory: Category = {
    id: 'new-releases',
    name: 'New Releases',
    description: 'Discover the latest AI tools and cutting-edge technologies',
    icon: 'Sparkles',
    subcategories: [
      {
        id: 'latest-releases',
        name: 'Latest AI Models & Tools',
        tools: [
          {
            id: 'claude-3-7-sonnet',
            name: 'Claude 3.7 Sonnet',
            useCase: 'Anthropic\'s newest model with enhanced reasoning and coding capabilities',
            url: 'https://claude.ai/',
            featured: true
          },
          {
            id: 'deepseek-r1',
            name: 'DeepSeek R1',
            useCase: 'Open-source reasoning model that rivals GPT-4 and Claude',
            url: 'https://www.deepseek.com/',
            featured: true
          },
          {
            id: 'gemini-2-5-flash',
            name: 'Gemini 2.5 Flash',
            useCase: 'Latest multimodal AI model from Google with enhanced speed and performance',
            url: 'https://gemini.google.com/',
            featured: true
          },
          {
            id: 'gpt-4-5-turbo',
            name: 'GPT-4.5 Turbo',
            useCase: 'Latest iteration of OpenAI\'s flagship model with improved context understanding',
            url: 'https://chatgpt.com/',
            featured: true
          },
          {
            id: 'sora-turbo',
            name: 'Sora Turbo',
            useCase: 'OpenAI\'s latest video generation model with improved quality and speed',
            url: 'https://sora.com/',
            featured: true
          }
        ]
      }
    ]
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <CategoryContent category={newReleasesCategory} />
      </div>
    </ProtectedRoute>
  );
}
