import { describe, it, expect } from 'vitest';
import * as dataLoader from '../lib/data-loader';

describe('DataLoader', () => {
  it('should load all surahs', () => {
    const surahs = dataLoader.getAllSurahs();
    expect(surahs.items.length).toBe(114);
    expect(surahs.items[0].name_en).toBe('Al-Faatiha');
  });

  it('should get surah by id', () => {
    const surah = dataLoader.getSurahById(1);
    expect(surah).not.toBeNull();
    expect(surah?.name_en).toBe('Al-Faatiha');
    expect(surah?.ayahs.length).toBe(7);
  });

  it('should get ayah by id', () => {
    const ayah = dataLoader.getAyah(1);
    expect(ayah).not.toBeNull();
    expect(ayah?.surah_id).toBe(1);
    expect(ayah?.number_in_surah).toBe(1);
  });

  it('should paginate results', () => {
    const surahs = dataLoader.getAllSurahs(1, 10);
    expect(surahs.items.length).toBe(10);
    expect(surahs.meta.total).toBe(114);
    if ('total_pages' in surahs.meta) {
      expect(surahs.meta.total_pages).toBe(12);
    }
  });

  it('should search ayahs', () => {
    const results = dataLoader.searchAyahs('praise');
    expect(results.items.length).toBeGreaterThan(0);
    expect(results.meta.total).toBeGreaterThan(0);
  });

  it('should validate filters', () => {
    expect(() => dataLoader.validateLanguageFilter('non-existent')).toThrow();
    expect(dataLoader.validateLanguageFilter('en')).toBe('en');
  });

  it('should expose knowledge entry for seeded ayah', () => {
    const knowledge = dataLoader.getKnowledgeByAyah(255);
    expect(knowledge).not.toBeNull();
    expect(knowledge?.themes).toContain('creed');
  });

  it('should expose dataset metadata', () => {
    const metadata = dataLoader.getDatasetMetadata();
    expect(metadata.counts.surahs).toBe(114);
    expect(metadata.counts.pages).toBe(604);
  });
});
