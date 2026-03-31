import toolsData from '../data/tools.json';
import categoriesData from '../data/categories.json';

export interface Tool {
  slug: string;
  name: string;
  category: string;
  description: string;
  pricing: string;
  pricingModel: 'free' | 'freemium' | 'paid';
  url: string;
  features: string[];
  pros: string[];
  cons: string[];
  rating: number;
  featured: boolean;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export const tools: Tool[] = toolsData as Tool[];
export const categories: Category[] = categoriesData as Category[];

export function getToolsByCategory(categoryName: string): Tool[] {
  return tools.filter(t => t.category === categoryName);
}

export function getCategoryByName(name: string): Category | undefined {
  return categories.find(c => c.name === name);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug);
}

export function getFeaturedTools(): Tool[] {
  return tools.filter(t => t.featured);
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find(t => t.slug === slug);
}

export function categoryNameToSlug(name: string): string {
  return name.toLowerCase().replace(/[&]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
}

export function getAllCategories(): string[] {
  return [...new Set(tools.map(t => t.category))];
}

export function getPricingBadgeColor(model: string): string {
  switch (model) {
    case 'free': return 'bg-green-100 text-green-800';
    case 'freemium': return 'bg-blue-100 text-blue-800';
    case 'paid': return 'bg-amber-100 text-amber-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}
