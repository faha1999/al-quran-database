import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { QuranDevSDK } from '../packages/sdk/src/sdk';

function jsonResponse(body: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(body), {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
}

describe('QuranDevSDK', () => {
  const mockFetch = vi.fn<typeof fetch>();
  const sdk = new QuranDevSDK({ baseUrl: 'https://example.test' });

  beforeEach(() => {
    vi.stubGlobal('fetch', mockFetch);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    mockFetch.mockReset();
  });

  it('builds versioned REST requests for core endpoints', async () => {
    mockFetch
      .mockResolvedValueOnce(
        jsonResponse({ success: true, data: [], meta: { total: 114, page: 2, limit: 5 } }),
      )
      .mockResolvedValueOnce(jsonResponse({ success: true, data: { id: 1, ayahs: [] } }))
      .mockResolvedValueOnce(jsonResponse({ success: true, data: { id: 1, words: [] } }))
      .mockResolvedValueOnce(jsonResponse({ success: true, data: [], meta: { total: 250 } }))
      .mockResolvedValueOnce(jsonResponse({ success: true, data: { id: 1, ayahs: [] } }))
      .mockResolvedValueOnce(jsonResponse({ success: true, data: { id: 1, ayahs: [] } }))
      .mockResolvedValueOnce(jsonResponse({ success: true, data: { id: 1, ayahs: [] } }))
      .mockResolvedValueOnce(jsonResponse({ success: true, data: { id: 1, ayahs: [] } }))
      .mockResolvedValueOnce(jsonResponse({ success: true, data: [], meta: { count: 4 } }))
      .mockResolvedValueOnce(
        jsonResponse({ success: true, data: [{ ayah_id: 255 }], meta: { total: 1, page: 2 } }),
      )
      .mockResolvedValueOnce(jsonResponse({ success: true, data: [{ id: 1 }], meta: { total: 1 } }))
      .mockResolvedValueOnce(jsonResponse({ success: true, data: [{ id: 1 }], meta: { total: 6 } }))
      .mockResolvedValueOnce(jsonResponse({ success: true, data: { ayah_id: 255 } }))
      .mockResolvedValueOnce(
        jsonResponse({ success: true, data: { dataset: { counts: { ayahs: 6236 } } } }),
      );

    await sdk.getSurahs(2, 5);
    await sdk.getSurah(1, 'en.sahih');
    await sdk.getAyah(1, 'en.sahih', true);
    await sdk.search('mercy', { language: 'en', limit: 5 });
    await sdk.getJuz(1, 'en.sahih');
    await sdk.getHizb(1, 'en.sahih');
    await sdk.getRub(1, 'en.sahih');
    await sdk.getPage(1, 'en.sahih');
    await sdk.getWords(1);
    await sdk.getDuas(2, 10);
    await sdk.getReciters();
    await sdk.getFaqs();
    await sdk.getKnowledge(255);
    await sdk.getMeta();

    expect(mockFetch).toHaveBeenNthCalledWith(
      1,
      'https://example.test/api/v1/surahs?page=2&limit=5',
    );
    expect(mockFetch).toHaveBeenNthCalledWith(
      2,
      'https://example.test/api/v1/surahs/1?edition=en.sahih',
    );
    expect(mockFetch).toHaveBeenNthCalledWith(
      3,
      'https://example.test/api/v1/ayahs/1?edition=en.sahih&include_words=true',
    );
    expect(mockFetch).toHaveBeenNthCalledWith(
      4,
      'https://example.test/api/v1/search?q=mercy&language=en&limit=5',
    );
    expect(mockFetch).toHaveBeenNthCalledWith(
      5,
      'https://example.test/api/v1/juz/1?edition=en.sahih',
    );
    expect(mockFetch).toHaveBeenNthCalledWith(
      6,
      'https://example.test/api/v1/hizb/1?edition=en.sahih',
    );
    expect(mockFetch).toHaveBeenNthCalledWith(
      7,
      'https://example.test/api/v1/rub/1?edition=en.sahih',
    );
    expect(mockFetch).toHaveBeenNthCalledWith(
      8,
      'https://example.test/api/v1/pages/1?edition=en.sahih',
    );
    expect(mockFetch).toHaveBeenNthCalledWith(9, 'https://example.test/api/v1/words?ayah_id=1');
    expect(mockFetch).toHaveBeenNthCalledWith(
      10,
      'https://example.test/api/v1/duas?page=2&limit=10',
    );
    expect(mockFetch).toHaveBeenNthCalledWith(11, 'https://example.test/api/v1/reciters');
    expect(mockFetch).toHaveBeenNthCalledWith(12, 'https://example.test/api/v1/faqs');
    expect(mockFetch).toHaveBeenNthCalledWith(13, 'https://example.test/api/v1/knowledge/255');
    expect(mockFetch).toHaveBeenNthCalledWith(14, 'https://example.test/api/v1/meta');
  });

  it('uses GraphQL POST for custom queries and research references', async () => {
    mockFetch
      .mockResolvedValueOnce(
        jsonResponse({ data: { meta: { dataset: { counts: { ayahs: 1 } } } } }),
      )
      .mockResolvedValueOnce(
        jsonResponse({
          data: {
            researchReferences: [
              {
                id: 1,
                title: 'Paper',
                author: 'Author',
                type: 'article',
                url: 'https://example.test/paper',
              },
            ],
          },
        }),
      );

    const graphqlResult = await sdk.graphql<{ meta: { dataset: { counts: { ayahs: number } } } }>({
      query: 'query Meta { meta { dataset { counts { ayahs } } } }',
    });
    const research = await sdk.getResearchReferences();

    expect(graphqlResult.meta.dataset.counts.ayahs).toBe(1);
    expect(research).toHaveLength(1);
    expect(mockFetch).toHaveBeenNthCalledWith(
      1,
      'https://example.test/api/v1/graphql',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    expect(mockFetch).toHaveBeenNthCalledWith(
      2,
      'https://example.test/api/v1/graphql',
      expect.objectContaining({
        method: 'POST',
      }),
    );
  });

  it('throws API errors for failed REST responses', async () => {
    mockFetch.mockResolvedValueOnce(
      jsonResponse({ error: 'Bad request' }, { status: 400, statusText: 'Bad Request' }),
    );

    await expect(sdk.getSurahs()).rejects.toThrow('Quran API error: 400 Bad Request');
  });

  it('throws API errors for unsuccessful envelopes', async () => {
    mockFetch.mockResolvedValueOnce(jsonResponse({ success: false, error: 'Unknown edition' }));

    await expect(sdk.getSurah(1, 'bad.edition')).rejects.toThrow('Unknown edition');
  });

  it('throws GraphQL errors', async () => {
    mockFetch.mockResolvedValueOnce(
      jsonResponse({ errors: [{ message: 'Query not allowed' }] }, { status: 400 }),
    );

    await expect(sdk.graphql({ query: 'query { nope }' })).rejects.toThrow('Query not allowed');
  });
});
