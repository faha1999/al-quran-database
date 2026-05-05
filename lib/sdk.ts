import type {
  ApiEnvelope,
  AyahKnowledgeEntry,
  DatasetMetadata,
  KnowledgeCoverage,
  KnowledgeFaqEntry,
  PaginationMeta,
  ResearchReference,
  ResolvedAyah,
  ResolvedDivision,
  ResolvedSurah,
  SearchMeta,
  SearchResultAyah,
  Surah,
  Word,
} from './quran-types';

export interface QuranApiOptions {
  baseUrl?: string;
  apiVersion?: 'v1';
}

export interface GraphqlRequest {
  query: string;
  variables?: Record<string, unknown>;
}

export interface MetaPayload {
  dataset: DatasetMetadata;
  knowledge: KnowledgeCoverage;
}

export class QuranDevSDK {
  private baseUrl: string;
  private apiBasePath: string;

  constructor(options: QuranApiOptions = {}) {
    this.baseUrl = options.baseUrl || '';
    this.apiBasePath = `/api/${options.apiVersion ?? 'v1'}`;
  }

  private async fetchEnvelope<T, TMeta = Record<string, unknown> | undefined>(
    path: string,
  ): Promise<ApiEnvelope<T, TMeta>> {
    const url = `${this.baseUrl}${path}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Quran API error: ${response.status} ${response.statusText}`);
    }
    const result = (await response.json()) as ApiEnvelope<T, TMeta>;
    if (!result.success) {
      throw new Error((result as { error?: string }).error || 'Unknown API error');
    }
    return result;
  }

  private async fetchData<T>(path: string): Promise<T> {
    const result = await this.fetchEnvelope<T>(path);
    return result.data;
  }

  async graphql<T = unknown>({ query, variables }: GraphqlRequest): Promise<T> {
    const response = await fetch(`${this.baseUrl}${this.apiBasePath}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    });
    const payload = (await response.json()) as { data?: T; errors?: { message: string }[] };
    if (!response.ok || payload.errors?.length) {
      throw new Error(payload.errors?.[0]?.message || `GraphQL error: ${response.status}`);
    }
    return payload.data as T;
  }

  async getSurahs(page?: number, limit?: number) {
    const params = new URLSearchParams();
    if (page) params.set('page', page.toString());
    if (limit) params.set('limit', limit.toString());
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.fetchEnvelope<Surah[], PaginationMeta>(`${this.apiBasePath}/surahs${query}`);
  }

  async getSurah(id: number, edition?: string) {
    const query = edition ? `?edition=${edition}` : '';
    return this.fetchData<ResolvedSurah>(`${this.apiBasePath}/surahs/${id}${query}`);
  }

  async getAyah(id: number, edition?: string, includeWords: boolean = false) {
    const params = new URLSearchParams();
    if (edition) params.set('edition', edition);
    if (includeWords) params.set('include_words', 'true');
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.fetchData<ResolvedAyah>(`${this.apiBasePath}/ayahs/${id}${query}`);
  }

  async search(
    query: string,
    filters: { edition?: string; language?: string; page?: number; limit?: number } = {},
  ) {
    const params = new URLSearchParams({ q: query });
    if (filters.edition) params.set('edition', filters.edition);
    if (filters.language) params.set('language', filters.language);
    if (filters.page) params.set('page', filters.page.toString());
    if (filters.limit) params.set('limit', filters.limit.toString());
    return this.fetchEnvelope<SearchResultAyah[], SearchMeta>(
      `${this.apiBasePath}/search?${params.toString()}`,
    );
  }

  async getJuz(id: number, edition?: string) {
    const query = edition ? `?edition=${edition}` : '';
    return this.fetchData<ResolvedDivision>(`${this.apiBasePath}/juz/${id}${query}`);
  }

  async getHizb(id: number, edition?: string) {
    const query = edition ? `?edition=${edition}` : '';
    return this.fetchData<ResolvedDivision>(`${this.apiBasePath}/hizb/${id}${query}`);
  }

  async getRub(id: number, edition?: string) {
    const query = edition ? `?edition=${edition}` : '';
    return this.fetchData<ResolvedDivision>(`${this.apiBasePath}/rub/${id}${query}`);
  }

  async getPage(id: number, edition?: string) {
    const query = edition ? `?edition=${edition}` : '';
    return this.fetchData<ResolvedDivision>(`${this.apiBasePath}/pages/${id}${query}`);
  }

  async getWords(ayahId: number) {
    return this.fetchEnvelope<Word[], { count: number }>(
      `${this.apiBasePath}/words?ayah_id=${ayahId}`,
    );
  }

  async getFaqs() {
    return this.fetchEnvelope<KnowledgeFaqEntry[], PaginationMeta>(`${this.apiBasePath}/faqs`);
  }

  async getKnowledge(ayahId: number) {
    return this.fetchData<AyahKnowledgeEntry>(`${this.apiBasePath}/knowledge/${ayahId}`);
  }

  async getMeta() {
    return this.fetchData<MetaPayload>(`${this.apiBasePath}/meta`);
  }

  async getResearchReferences() {
    const data = await this.graphql<{ researchReferences: ResearchReference[] }>({
      query: `query ResearchReferences { researchReferences { id title author type url } }`,
    });
    return data.researchReferences;
  }
}

export const quran = new QuranDevSDK();
