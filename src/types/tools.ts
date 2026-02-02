
export interface Tool {
  id: string;
  name: string;
  useCase: string;
  url: string;
  featured?: boolean;
  hasReviewDialog?: boolean;
  rating?: number;
}

export interface Subcategory {
  id: string;
  name: string;
  tools: Tool[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  subcategories: Subcategory[];
}
