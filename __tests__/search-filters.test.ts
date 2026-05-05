import { describe, expect, it } from 'vitest';
import {
  applyEditionFilter,
  applyLanguageFilter,
  getEditionGroups,
  getLanguageOptions,
} from '@/lib/search-filters';

describe('search filters', () => {
  it('builds language options from text editions', () => {
    const options = getLanguageOptions();

    expect(options.length).toBeGreaterThan(3);
    expect(options[0]).toHaveProperty('label');
    expect(options[0]).toHaveProperty('value');
  });

  it('groups editions by language', () => {
    const groups = getEditionGroups();

    expect(groups.length).toBeGreaterThan(3);
    expect(groups[0]?.options.length).toBeGreaterThan(0);
  });

  it('clears language when edition selected', () => {
    expect(applyEditionFilter({ edition: '', language: 'en' }, 'en.sahih')).toEqual({
      edition: 'en.sahih',
      language: '',
    });
  });

  it('clears edition when language selected', () => {
    expect(applyLanguageFilter({ edition: 'en.sahih', language: '' }, 'bn')).toEqual({
      edition: '',
      language: 'bn',
    });
  });
});
