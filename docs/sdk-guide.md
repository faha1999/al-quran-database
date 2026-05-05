# SDK Guide

The Al-Quran Database provides a lightweight TypeScript SDK (`QuranDevSDK`) to simplify interactions with the REST and GraphQL APIs.

Source of truth for the package lives in `packages/sdk`.

## Installation

```bash
npm install @faha1999/al-quran-database
```

## Initialization

```typescript
import { QuranDevSDK } from '@faha1999/al-quran-database';

const quran = new QuranDevSDK({
  baseUrl: 'https://al-quran-database.vercel.app', // Optional, defaults to same origin
  apiVersion: 'v1',
});
```

## Usage Examples

### Fetching Surahs

```typescript
const { data, meta } = await quran.getSurahs(1, 10);
console.log(`Total Surahs: ${meta.total}`);
```

### Fetching a Specific Ayah

```typescript
// Fetch Al-Fatiha 1 with Sahih International translation and word breakdown
const ayah = await quran.getAyah(1, 'en.sahih', true);
console.log(ayah.text); // Arabic text
console.log(ayah.translation); // English text
console.log(ayah.words); // Array of word objects
```

### Performing a Ranked Search

```typescript
const { data: results, meta } = await quran.search('mercy', {
  language: 'en',
  limit: 5,
});

results.forEach((result) => {
  console.log(`Matched Ayah: ${result.surah_id}:${result.number_in_surah}`);
});
```

### Accessing the Knowledge Layer

```typescript
const knowledge = await quran.getKnowledge(1);
console.log('Themes:', knowledge.themes);
console.log('Historical Context:', knowledge.historical_context);
```

### Fetching duas and reciters

```typescript
const { data: duas } = await quran.getDuas(1, 10);
const { data: reciters } = await quran.getReciters();

console.log(duas[0]?.text);
console.log(reciters[0]?.identifier);
```

### Using GraphQL

For custom data requirements, use the `graphql` method:

```typescript
const query = `
  query GetAyah($id: Int!) {
    ayah(id: $id) {
      text
      knowledge {
        scientific_references {
          title
        }
      }
    }
  }
`;

const data = await quran.graphql({ query, variables: { id: 1 } });
```

## API Reference (SDK Methods)

| Method                               | Description                                            |
| :----------------------------------- | :----------------------------------------------------- |
| `getSurahs(page, limit)`             | List all surahs with pagination metadata.              |
| `getSurah(id, edition)`              | Get detailed surah metadata and ayahs.                 |
| `getAyah(id, edition, includeWords)` | Get specific ayah with optional translation and words. |
| `search(query, filters)`             | Perform full-text search with optional filters.        |
| `getJuz(id, edition)`                | Get data for a specific Juz division.                  |
| `getHizb(id, edition)`               | Get data for a specific Hizb division.                 |
| `getRub(id, edition)`                | Get data for a specific Rub division.                  |
| `getPage(id, edition)`               | Get data for a specific Mushaf page.                   |
| `getWords(ayahId)`                   | Get word-by-word breakdown for one ayah.               |
| `getDuas(page, limit)`               | List extracted duas with pagination metadata.          |
| `getReciters()`                      | List normalized reciter metadata.                      |
| `getFaqs()`                          | List FAQ entries from the knowledge base.              |
| `getKnowledge(ayahId)`               | Get scholarly metadata for an ayah.                    |
| `getMeta()`                          | Get system and dataset metadata.                       |
| `getResearchReferences()`            | Fetch research references through GraphQL.             |
| `graphql({ query, variables })`      | Execute a custom GraphQL query.                        |
