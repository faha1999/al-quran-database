import { describe, expect, it } from 'vitest';
import { GET as AyahGET } from '@/app/api/ayahs/[id]/route';
import { GET as SearchGET } from '@/app/api/search/route';
import { GET as SurahsGET } from '@/app/api/surahs/route';
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
  });

  describe('/api/words', () => {
    it('returns validation error when ayah_id missing', async () => {
      const response = await WordsGET(new Request('http://localhost/api/words'));
      const payload = await response.json();

      expect(response.status).toBe(400);
      expect(payload.error).toContain('ayah_id');
    });
  });
});
