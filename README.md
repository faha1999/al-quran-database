# 📖 Quran Developer Platform (MVP)

> A high-performance, developer-first Quran platform with a clean REST API, world-class documentation, and real-world examples.

![Landing Page](screenshots/landing.png)

## 🚀 Vision
To empower developers to build beautiful and intelligent Islamic applications by providing the most accessible and performant Quranic data layer.

## ✨ Key Features
- **Clean REST API**: Structured JSON responses for Surahs and Ayahs.
- **Fast Search**: Instant keyword search powered by FlexSearch.
- **Modern Docs**: Built with Next.js App Router for maximum speed.
- **Developer First**: Copy-paste friendly examples and live API playground.
- **Edge Ready**: Optimized for global, low-latency delivery.

## 🛠️ Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Search**: FlexSearch
- **Data**: Static Optimized JSON
- **Deployment**: Vercel

## 📖 API Documentation

### Endpoints
- `GET /api/surahs`: List all 114 Surahs.
- `GET /api/surahs/[id]`: Get Surah details with all Ayahs.
- `GET /api/ayahs/[id]`: Get Ayah by global number (1-6236).
- `GET /api/search?q=query`: High-performance keyword search.

### Quick Start
```bash
curl https://quran-dev.vercel.app/api/surahs/1
```

## 🏗️ Local Development

1. **Clone & Install**:
   ```bash
   git clone https://github.com/faha1999/al-quran-database.git
   cd al-quran-database
   pnpm install
   ```

2. **Run Dev Server**:
   ```bash
   pnpm dev
   ```

3. **Build for Production**:
   ```bash
   pnpm build
   ```

## 🗺️ Roadmap
- [x] REST API Layer
- [x] Documentation Site
- [x] Keyword Search
- [ ] Semantic Search (Embeddings)
- [ ] Multi-language Translations
- [ ] Developer Playground

## 🤝 Contributing
We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## 📜 License
MIT License. Quran text is in the Public Domain.

---
Built with ❤️ by **Kawsar Ahmed Fahad**
