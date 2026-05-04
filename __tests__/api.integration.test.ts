import { describe, it, expect, vi } from 'vitest';
import { GET as SearchGET } from '../app/api/search/route';
import { GET as AyahGET } from '../app/api/ayahs/[id]/route';

describe('API Integration Tests', () => {
  describe('/api/search', () => {
    it('returns 400 if query is missing', async () => {
      const req = new Request('http://localhost/api/search');
      const res = await SearchGET(req);
      expect(res.status).toBe(400);
      
      const json = await res.json();
      expect(json.success).toBe(false);
      expect(json.error).toContain('required');
    });

    it('returns results for valid query', async () => {
      const req = new Request('http://localhost/api/search?q=mercy&limit=5');
      const res = await SearchGET(req);
      expect(res.status).toBe(200);
      
      const json = await res.json();
      expect(json.success).toBe(true);
      expect(json.data.length).toBeLessThanOrEqual(5);
      expect(json.meta).toBeDefined();
    });
  });

  describe('/api/ayahs/[id]', () => {
    it('returns 404 for non-existent ayah', async () => {
      const req = new Request('http://localhost/api/ayahs/999999');
      const res = await AyahGET(req, { params: Promise.resolve({ id: '999999' }) });
      expect(res.status).toBe(404);
      
      const json = await res.json();
      expect(json.success).toBe(false);
    });

    it('returns ayah data for valid id', async () => {
      const req = new Request('http://localhost/api/ayahs/1?include_words=true');
      const res = await AyahGET(req, { params: Promise.resolve({ id: '1' }) });
      expect(res.status).toBe(200);
      
      const json = await res.json();
      expect(json.success).toBe(true);
      expect(json.data.number).toBe(1);
      expect(json.data.words).toBeDefined();
    });
  });
});
