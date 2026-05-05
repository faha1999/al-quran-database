# API Reference

The Al-Quran Database provides both REST and GraphQL interfaces for high-performance data access. All responses are JSON-formatted and include cache status headers.

## GraphQL API

**Endpoint**: `/api/v1/graphql`  
**Method**: `POST`

The GraphQL API is the preferred method for complex queries, allowing you to fetch multiple entities (e.g., Ayah + Words + Knowledge) in a single request.

### Example: Fetch Ayah with Words and Knowledge

```graphql
query {
  ayah(id: 1, includeWords: true) {
    number
    text
    translation
    words {
      text
      position
    }
    knowledge {
      themes
      historical_context
      scientific_references {
        title
        summary
      }
    }
  }
}
```

### Example: Ranked Search

```graphql
query {
  search(query: "mercy", language: "en", page: 1, limit: 10) {
    items {
      text
      translation
      matched_identifiers
    }
    meta {
      total
      total_pages
    }
  }
}
```

---

## REST API (v1)

**Base URL**: `/api/v1`

### Endpoints Summary

| Endpoint              | Method | Description                              |
| :-------------------- | :----- | :--------------------------------------- |
| `/surahs`             | GET    | List all Surahs with pagination.         |
| `/surahs/:id`         | GET    | Get Surah details and ayahs.             |
| `/ayahs/:id`          | GET    | Get a specific Ayah by absolute ID.      |
| `/search`             | GET    | Search ayahs using FlexSearch.           |
| `/knowledge/:ayah_id` | GET    | Get scholarly metadata for an ayah.      |
| `/words?ayah_id=1`    | GET    | Get word-by-word breakdown for an ayah.  |
| `/juz/:id`            | GET    | Get division data for a Juz.             |
| `/hizb/:id`           | GET    | Get division data for a Hizb.            |
| `/rub/:id`            | GET    | Get division data for a Rub.             |
| `/pages/:id`          | GET    | Get division data for a Mushaf page.     |
| `/duas`               | GET    | List extracted duas with pagination.     |
| `/reciters`           | GET    | List normalized reciter metadata.        |
| `/faqs`               | GET    | List FAQ entries from knowledge base.    |
| `/meta`               | GET    | Get dataset and knowledge base metadata. |

### Common Parameters

- `edition`: (Optional) Identifier for a specific translation (e.g., `en.sahih`).
- `language`: (Optional) Search filter for translation language. Use on `/search`.
- `page`: (Optional) Page number for paginated results.
- `limit`: (Optional) Number of items per page.
- `ayah_id`: (Required for `/words`) Absolute ayah ID.

### Response Structure

All REST responses follow a normalized shape:

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "total": 114,
    "page": 1
  }
}
```

---

## Caching & Performance

### X-Cache Header

All API responses include an `X-Cache` header indicating the cache status:

- `hit-memory`: Served from L1 in-memory cache.
- `hit-redis`: Served from L2 Redis cache.
- `miss`: Cache miss, data loaded from disk.
- `skip`: Caching bypassed.

### Rate Limiting

Public API access is limited to **100 requests per minute** per IP address.

### Version Headers

All REST responses also include:

- `X-API-Version`
- `X-API-Latest-Version`
