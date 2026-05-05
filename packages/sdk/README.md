# `@faha1999/al-quran-database`

Type-safe JavaScript and TypeScript SDK for the Al-Quran Database REST and GraphQL APIs.

## Install

```bash
npm install @faha1999/al-quran-database
```

## Usage

```ts
import { QuranDevSDK } from '@faha1999/al-quran-database';

const quran = new QuranDevSDK({
  baseUrl: 'https://al-quran-database.vercel.app',
});

const surah = await quran.getSurah(1, 'en.sahih');
console.log(surah.name_en);
console.log(surah.ayahs[0]?.translation);

const { data: duas } = await quran.getDuas(1, 5);
const { data: reciters } = await quran.getReciters();
console.log(duas[0]?.text);
console.log(reciters[0]?.name);
```

## Default behavior

- `baseUrl` defaults to same-origin, which is useful inside browser apps deployed alongside the API.
- `apiVersion` defaults to `v1`.
- The package ships as ESM only and targets Node.js 18+ environments with native `fetch`.

## Exports

- `QuranDevSDK`
- `quran`
- `QuranApiOptions`
- `GraphqlRequest`
- `MetaPayload`
- Public entity and response types from the API schema

## API coverage

- Surahs, ayahs, pages, juz, hizb, rub
- Search with edition or language filters
- Words, duas, reciters, FAQs, knowledge entries, metadata
- GraphQL requests

## Source of truth

- Published package source: [`packages/sdk`](https://github.com/faha1999/al-quran-database/tree/main/packages/sdk)
- Runtime surface is verified in repo tests and `npm run verify:sdk`

## Links

- Docs: [https://al-quran-database.vercel.app/docs/sdk](https://al-quran-database.vercel.app/docs/sdk)
- API docs: [https://al-quran-database.vercel.app/docs/api-reference](https://al-quran-database.vercel.app/docs/api-reference)
- Repository: [https://github.com/faha1999/al-quran-database](https://github.com/faha1999/al-quran-database)
