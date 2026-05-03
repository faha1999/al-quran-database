import type { ResolvedAyah, SearchResultAyah, Surah } from './quran-types';

export interface QuranApiOptions {
  baseUrl?: string;
}

export class QuranDevSDK {
  private baseUrl: string;

  constructor(options: QuranApiOptions = {}) {
    this.baseUrl = options.baseUrl || '';
  }

  private async fetcher<T>(path: string): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Quran API error: ${response.status} ${response.statusText}`);
    }
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || 'Unknown API error');
    }
    return result.data;
  }

  /**
   * Get all surahs with optional pagination
   */
  async getSurahs(page?: number, limit?: number) {
    const params = new URLSearchParams();
    if (page) params.set('page', page.toString());
    if (limit) params.set('limit', limit.toString());
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.fetcher<Surah[]>(`/api/surahs${query}`);
  }

  /**
   * Get a specific surah by ID or Number
   */
  async getSurah(id: number, edition?: string) {
    const query = edition ? `?edition=${edition}` : '';
    return this.fetcher<ResolvedAyah[]>(`/api/surahs/${id}${query}`);
  }

  /**
   * Get a specific ayah by ID
   */
  async getAyah(id: number, edition?: string) {
    const query = edition ? `?edition=${edition}` : '';
    return this.fetcher<ResolvedAyah>(`/api/ayahs/${id}${query}`);
  }

  /**
   * Search for ayahs
   */
  async search(query: string, filters: { edition?: string; language?: string; page?: number; limit?: number } = {}) {
    const params = new URLSearchParams({ q: query });
    if (filters.edition) params.set('edition', filters.edition);
    if (filters.language) params.set('language', filters.language);
    if (filters.page) params.set('page', filters.page.toString());
    if (filters.limit) params.set('limit', filters.limit.toString());
    
    return this.fetcher<SearchResultAyah[]>(`/api/search?${params.toString()}`);
  }

  /**
   * Get all ayahs in a specific Juz
   */
  async getJuz(id: number, edition?: string) {
    const query = edition ? `?edition=${edition}` : '';
    return this.fetcher<ResolvedAyah[]>(`/api/juz/${id}${query}`);
  }
}

// Export a default instance for easy use
export const quran = new QuranDevSDK();
