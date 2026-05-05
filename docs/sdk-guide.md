# SDK Guide

The Al-Quran Database provides a lightweight TypeScript SDK (`QuranDevSDK`) to simplify interactions with the REST and GraphQL APIs.

## Installation

```bash
npm install @quran-dev/sdk
```

## Initialization

```typescript
import { QuranDevSDK } from '@quran-dev/sdk';

const quran = new QuranDevSDK({
  baseUrl: 'https://api.qurandatabase.org', // Optional, defaults to same origin
  apiVersion: 'v1'
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
  limit: 5
});

results.forEach(result => {
  console.log(`Matched Ayah: ${result.surah_id}:${result.ayah_number}`);
});
```

### Accessing the Knowledge Layer
```typescript
const knowledge = await quran.getKnowledge(1);
console.log('Themes:', knowledge.themes);
console.log('Historical Context:', knowledge.historical_context);
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

| Method | Description |
| :--- | :--- |
| `getSurahs(page, limit)` | List all surahs with pagination metadata. |
| `getSurah(id, edition)` | Get detailed surah metadata and ayahs. |
| `getAyah(id, edition, includeWords)` | Get specific ayah with optional translation and words. |
| `search(query, filters)` | Perform full-text search with optional filters. |
| `getJuz(id, edition)` | Get data for a specific Juz division. |
| `getKnowledge(ayahId)` | Get scholarly metadata for an ayah. |
| `getMeta()` | Get system and dataset metadata. |
| `graphql({ query, variables })` | Execute a custom GraphQL query. |
