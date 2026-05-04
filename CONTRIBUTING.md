# Contributing to Quran Developer Platform

We love your input! We want to make contributing to this project as easy and transparent as possible.

## Our Tech Stack
- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Testing**: Vitest
- **Linting**: ESLint + Prettier

## Contribution Workflow

1. **Fork the repo** and create your branch from `main`.
2. **Setup environment**:
   ```bash
   npm install
   ```
3. **Make your changes**:
   - Follow the [Coding Style Guide](docs/coding-style.md).
   - Ensure all functions have proper TSDoc comments.
   - Use absolute imports (e.g., `@/lib/...`).
4. **Test your changes**:
   ```bash
   npm test
   ```
5. **Format & Lint**:
   ```bash
   npm run format
   npm run lint:fix
   ```
6. **Update Documentation**:
   - If you've changed APIs, update the `/docs` pages.
7. **Submit a Pull Request**.

## Data Contributions

If you are contributing new translations or editions:
1. Ensure the data is in JSON format matching our schema.
2. Use the `scripts/verify_quran_data.py` to validate your data.
3. Include the source and license of the data.

## License

By contributing, you agree that your contributions will be licensed under its MIT License.
