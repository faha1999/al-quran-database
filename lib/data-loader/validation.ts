import { editionsByIdentifier, supportedLanguages } from './core';

export function validateEditionFilter(identifier: string | null): string | null {
  if (!identifier) return null;
  if (!editionsByIdentifier.has(identifier)) {
    throw new Error(`Unknown edition "${identifier}"`);
  }
  return identifier;
}

export function validateSearchEditionFilter(identifier: string | null): string | null {
  const validated = validateEditionFilter(identifier);
  if (!validated) return null;
  const edition = editionsByIdentifier.get(validated);
  if (!edition || edition.format !== 'text') {
    throw new Error(`Unsupported search edition "${validated}"`);
  }
  return validated;
}

export function validateLanguageFilter(language: string | null): string | null {
  if (!language) return null;
  if (!supportedLanguages.has(language)) {
    throw new Error(`Unsupported language "${language}"`);
  }
  return language;
}
