import { describe, expect, it } from 'vitest';
import { GET as AyahGET } from '@/app/api/ayahs/[id]/route';
import { GET as FaqGET } from '@/app/api/faqs/route';
import { GET as GraphqlGET } from '@/app/api/graphql/route';
import { GET as KnowledgeGET } from '@/app/api/knowledge/[id]/route';
import { GET as MetaGET } from '@/app/api/meta/route';
import { GET as SearchGET } from '@/app/api/search/route';
import { GET as SurahsGET } from '@/app/api/surahs/route';
import { GET as V1SurahsGET } from '@/app/api/v1/surahs/route';
import { GET as WordsGET } from '@/app/api/words/route';

describe('API integration', () => {
  describe('/api/search', () => {
    it('returns 400 if query missing', async () => {
      const response = await SearchGET(new Request('http://localhost/api/search'));
      const payload = await response.json();

      expect(response.status).toBe(400);
      expect(payload.success).toBe(false);
      expect(payload.error).toContain('required');
    });

    it('returns 400 when edition and language both supplied', async () => {
      const response = await SearchGET(
        new Request('http://localhost/api/search?q=mercy&edition=en.sahih&language=en'),
      );
      const payload = await response.json();

      expect(response.status).toBe(400);
      expect(payload.error).toContain('either "edition" or "language"');
    });

    it('returns results for valid query', async () => {
      const response = await SearchGET(new Request('http://localhost/api/search?q=mercy&limit=5'));
      const payload = await response.json();

      expect(response.status).toBe(200);
      expect(payload.success).toBe(true);
      expect(payload.data.length).toBeLessThanOrEqual(5);
      expect(payload.meta).toBeDefined();
    });

    it('returns Arabic results for Arabic query', async () => {
      const response = await SearchGET(new Request('http://localhost/api/search?q=الله&limit=5'));
      const payload = await response.json();

      expect(response.status).toBe(200);
      expect(payload.success).toBe(true);
      expect(payload.data.length).toBeGreaterThan(0);
    });
  });

  describe('/api/ayahs/[id]', () => {
    it('returns 404 for non-existent ayah', async () => {
      const response = await AyahGET(new Request('http://localhost/api/ayahs/999999'), {
        params: Promise.resolve({ id: '999999' }),
      });
      const payload = await response.json();

      expect(response.status).toBe(404);
      expect(payload.success).toBe(false);
    });

    it('returns ayah data and words for valid id', async () => {
      const response = await AyahGET(
        new Request('http://localhost/api/ayahs/1?include_words=true'),
        { params: Promise.resolve({ id: '1' }) },
      );
      const payload = await response.json();

      expect(response.status).toBe(200);
      expect(payload.success).toBe(true);
      expect(payload.data.number).toBe(1);
      expect(payload.data.words).toBeDefined();
      expect(payload.data.asbab).toBeDefined();
    });
  });

  describe('/api/surahs', () => {
    it('returns paginated result with meta', async () => {
      const response = await SurahsGET(new Request('http://localhost/api/surahs?page=2&limit=10'));
      const payload = await response.json();

      expect(response.status).toBe(200);
      expect(payload.data).toHaveLength(10);
      expect(payload.meta.page).toBe(2);
      expect(payload.meta.total).toBe(114);
    });

    it('supports versioned alias', async () => {
      const response = await V1SurahsGET(new Request('http://localhost/api/v1/surahs?limit=5'));
      const payload = await response.json();

      expect(response.status).toBe(200);
      expect(payload.data).toHaveLength(5);
    });
  });

  describe('/api/words', () => {
    it('returns validation error when ayah_id missing', async () => {
      const response = await WordsGET(new Request('http://localhost/api/words'));
      const payload = await response.json();

      expect(response.status).toBe(400);
      expect(payload.error).toContain('ayah_id');
    });
  });

  describe('/api/knowledge/[id]', () => {
    it('returns knowledge entry when seeded', async () => {
      const response = await KnowledgeGET(new Request('http://localhost/api/knowledge/255'), {
        params: Promise.resolve({ id: '255' }),
      });
      const payload = await response.json();

      expect(response.status).toBe(200);
      expect(payload.data.ayah_id).toBe(255);
    });
  });

  describe('/api/faqs', () => {
    it('returns canonical faq payload', async () => {
      const response = await FaqGET();
      const payload = await response.json();

      expect(response.status).toBe(200);
      expect(payload.success).toBe(true);
      expect(payload.meta.total).toBeGreaterThan(0);
    });
  });

  describe('/api/meta', () => {
    it('returns dataset metadata and coverage', async () => {
      const response = await MetaGET();
      const payload = await response.json();

      expect(response.status).toBe(200);
      expect(payload.data.dataset.counts.ayahs).toBe(6236);
      expect(payload.data.knowledge.ayah_entries).toBeGreaterThan(0);
    });
  });

  describe('/api/graphql', () => {
    it('executes GET query', async () => {
      const query = encodeURIComponent(
        '{ meta { dataset { counts { ayahs } } } surah(id: 1) { name_en ayahs { id } } }',
      );
      const response = await GraphqlGET(new Request(`http://localhost/api/graphql?query=${query}`));
      const payload = await response.json();

      expect(response.status).toBe(200);
      expect(payload.data.meta.dataset.counts.ayahs).toBe(6236);
      expect(payload.data.surah.name_en).toBe('Al-Faatiha');
    });
  });
});
