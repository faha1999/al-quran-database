# Search Engine

The Al-Quran Database uses **FlexSearch**, a high-performance full-text search engine, to provide fast and accurate ranked results for both Arabic and translation text.

## Core Features

- **Ranked Search**: Results are scored based on relevance and proximity.
- **Fuzzy Matching**: Handles minor typos and variations in spelling.
- **Bi-Lingual Indexing**: Searches across both Arabic text (normalized) and English translations.
- **Suggestion Support**: Provides related results even if no exact match is found.

## Text Normalization

To ensure consistent search results, all text is normalized before indexing and searching.

### Arabic Normalization

The `normalizeArabicText` utility performs the following operations:

1. **Diacritics Removal**: Removes Harakat (Fatha, Kasra, Damma, etc.) to allow searching based on the base letters.
2. **Letter Simplification**: Standardizes variations of Alif (`أ`, `إ`, `آ`, `ٱ`) to a basic Alif (`ا`).
3. **Punctuation Stripping**: Removes Tatweel (`ـ`) and non-essential markers.
4. **NFKD Normalization**: Standardizes Unicode representation.

### English/Latin Normalization

- Converts text to lowercase.
- Trims whitespace.

## FlexSearch Configuration

The index is configured with the following parameters:

- **Tokenize**: `full` (supports partial word matching).
- **Context**: Enabled (allows for proximity-based ranking).
- **Cache**: Enabled (improves performance for repeated queries).

### Searchable Fields

1. `text`: The normalized Arabic text of the ayah.
2. `translation`: The normalized default English translation.

## Performance

The search index is initialized in-memory during server startup. For concrete timings, use
`npm run data:bench`; benchmark output depends on machine, Node runtime, and current dataset size.

## Usage in API

The `/search` endpoint and GraphQL `search` query wrap the `advancedSearch` function to provide a paginated interface to the FlexSearch index.
