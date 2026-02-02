
'use client';

import { categoriesData } from '@/data/tools-data';
import { ToolCard } from '@/components/ToolCard';
import { Tool } from '@/types/tools';
import { useMemo } from 'react';
import { Search, Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SearchResultsProps {
  query: string;
}

export function SearchResults({ query }: SearchResultsProps) {
  const results = useMemo(() => {
    if (!query.trim()) {
      return [];
    }

    const searchTerm = query.toLowerCase().trim();
    const foundTools: Array<Tool & { categoryName: string; subcategoryName: string; matchScore: number }> = [];

    categoriesData.forEach((category) => {
      category.subcategories.forEach((subcategory) => {
        subcategory.tools.forEach((tool) => {
          let matchScore = 0;
          const toolName = tool.name.toLowerCase();
          const toolUseCase = tool.useCase.toLowerCase();
          const categoryName = category.name.toLowerCase();
          const subcategoryName = subcategory.name.toLowerCase();

          // Exact matches get highest score
          if (toolName === searchTerm) matchScore += 100;
          if (toolUseCase === searchTerm) matchScore += 80;

          // Starts with matches
          if (toolName.startsWith(searchTerm)) matchScore += 50;
          if (toolUseCase.startsWith(searchTerm)) matchScore += 40;

          // Contains matches
          if (toolName.includes(searchTerm)) matchScore += 30;
          if (toolUseCase.includes(searchTerm)) matchScore += 25;
          if (categoryName.includes(searchTerm)) matchScore += 15;
          if (subcategoryName.includes(searchTerm)) matchScore += 10;

          // Word boundary matches (whole word)
          const wordBoundaryRegex = new RegExp(`\\b${searchTerm}\\b`, 'i');
          if (wordBoundaryRegex.test(toolName)) matchScore += 60;
          if (wordBoundaryRegex.test(toolUseCase)) matchScore += 50;

          // Multi-word search support
          const searchWords = searchTerm.split(/\s+/).filter(word => word.length > 0);
          if (searchWords.length > 1) {
            searchWords.forEach(word => {
              if (toolName.includes(word)) matchScore += 10;
              if (toolUseCase.includes(word)) matchScore += 8;
            });
          }

          if (matchScore > 0) {
            foundTools.push({
              ...tool,
              categoryName: category.name,
              subcategoryName: subcategory.name,
              matchScore,
            });
          }
        });
      });
    });

    // Sort by match score (highest first), then by name
    return foundTools.sort((a, b) => {
      if (b.matchScore !== a.matchScore) {
        return b.matchScore - a.matchScore;
      }
      return a.name.localeCompare(b.name);
    });
  }, [query]);

  if (!query.trim()) {
    return (
      <div className="text-center py-20">
        <Search className="w-20 h-20 mx-auto mb-6 text-muted-foreground opacity-20" />
        <h2 className="text-2xl font-semibold mb-3">Start Your Search</h2>
        <p className="text-muted-foreground text-lg">
          Enter a search term above to find AI tools
        </p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-20">
        <Package className="w-20 h-20 mx-auto mb-6 text-muted-foreground opacity-20" />
        <h2 className="text-2xl font-semibold mb-3">No Results Found</h2>
        <p className="text-muted-foreground text-lg mb-2">
          No tools found matching &ldquo;{query}&rdquo;
        </p>
        <p className="text-sm text-muted-foreground">
          Try different keywords or browse by category
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="text-base px-4 py-2">
            {results.length} tool{results.length !== 1 ? 's' : ''} found
          </Badge>
          <p className="text-sm text-muted-foreground">
            for &ldquo;{query}&rdquo;
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((tool) => (
          <div key={tool.id} className="space-y-3">
            <ToolCard tool={tool} />
            <div className="flex items-center gap-2 text-xs text-muted-foreground px-2">
              <span className="font-medium">{tool.categoryName}</span>
              <span>→</span>
              <span>{tool.subcategoryName}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
