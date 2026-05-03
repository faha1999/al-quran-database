import { searchAyahs } from '@/lib/data-loader';

export function searchAyahsWithFlex(query: string) {
  return searchAyahs(query, { page: 1, limit: 50 }).items;
}
