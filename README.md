# 📖 Quran Developer Platform (MVP)

> A high-performance, developer-first Quran platform with a clean REST API, world-class documentation, and real-world examples.

![Landing Page](screenshots/landing.png)

## 🚀 Vision
To empower developers to build beautiful and intelligent Islamic applications by providing the most accessible and performant Quranic data layer.

## ✨ Key Features
- **Clean REST API**: Structured JSON responses for Surahs and Ayahs.
- **Fast Search**: Instant keyword search and ranking powered by FlexSearch.
- **Modern Docs**: Built with Next.js App Router for maximum speed.
- **Developer First**: Copy-paste friendly examples and a robust JS/TS SDK.
- **Relational Exports**: Direct downloads for PostgreSQL and indexed SQLite databases.
- **Edge Ready**: Optimized for global, low-latency delivery with sharded JSON loading.

## 🛠️ Tech Stack
- **Framework**: Next.js 16.2 (App Router)
- **Styling**: Tailwind CSS v4
- **Search**: FlexSearch (Ranked, Fuzzy)
- **Data**: Sharded Optimized JSON (Edge-ready)
- **Deployment**: GitHub Pages

## 📖 API Documentation

### Endpoints
- `GET /api/surahs`: List all 114 Surahs.
- `GET /api/ayahs/[id]`: Get Ayah by global number (1-6236).
- `GET /api/juz/[id]`: Get Juz details (1-30).
- `GET /api/hizb/[id]`: Get Hizb details (1-60).
- `GET /api/rub/[id]`: Get Rub (Quarter) details (1-480).
- `GET /api/pages/[id]`: Get Mushaf page details (1-604).
- `GET /api/words?ayah_id=[id]`: Get word-by-word breakdown.
- `GET /api/duas`: Get extracted Quranic supplications.
- `GET /api/reciters`: Get supported reciters.
- `GET /api/search?q=query`: High-performance ranked search.

### JS/TS SDK
```typescript
import { quran } from './lib/sdk';

const ayah = await quran.getAyah(1);
console.log(ayah.text);
```

## 🏗️ Local Development

1. **Clone & Install**:
   ```bash
   git clone https://github.com/faha1999/al-quran-database.git
   cd al-quran-database
   pnpm install
   ```

2. **Data Pipeline**:
   The project uses a Python-based pipeline to convert SQL data into sharded JSON.
   ```bash
   python scripts/convert_quran_sql.py
   python scripts/generate_word_data.py
   python scripts/export_sql.py
   ```

3. **Run Dev Server**:
   ```bash
   pnpm dev
   ```

## 🗺️ Roadmap
- [x] REST API Layer & Sharded Data [✔]
- [x] JS/TS Developer SDK [✔]
- [x] Relational SQL Exports (Postgres/SQLite) [✔]
- [x] Word-by-Word linguistic data [✔]
- [x] Advanced Ranked Search [✔]
- [x] Scholarly Data Expansion (Tafsir, Transliterations, Translations, Duas, Hadith) [✔]
- [ ] Semantic Search (Embeddings)
- [ ] Developer Playground

## 🤝 Contributing
We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## 📜 License
MIT License. Quran text is in the Public Domain.

---
Built with ❤️ by **Kawsar Ahmed Fahad**
