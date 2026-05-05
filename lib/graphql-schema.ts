import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';
import {
  getAllSurahs,
  getAyah,
  getDatasetMetadata,
  getHizbById,
  getJuzById,
  getKnowledgeByAyah,
  getKnowledgeCoverage,
  getKnowledgeFaqs,
  getPageById,
  getResearchReferences,
  getRubById,
  getSurahById,
  searchAyahs,
  validateLanguageFilter,
  validateSearchEditionFilter,
} from '@/lib/data-loader';

const EditionSummaryType = new GraphQLObjectType({
  name: 'EditionSummary',
  fields: {
    identifier: { type: new GraphQLNonNull(GraphQLString) },
    language: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    englishName: { type: new GraphQLNonNull(GraphQLString) },
    format: { type: new GraphQLNonNull(GraphQLString) },
    type: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const WordType = new GraphQLObjectType({
  name: 'Word',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    ayah_id: { type: new GraphQLNonNull(GraphQLInt) },
    text: { type: new GraphQLNonNull(GraphQLString) },
    position: { type: new GraphQLNonNull(GraphQLInt) },
    surah_id: { type: new GraphQLNonNull(GraphQLInt) },
    number_in_surah: { type: new GraphQLNonNull(GraphQLInt) },
    root: { type: GraphQLString },
    morphology: { type: GraphQLString },
  },
});

const AyahCrossReferenceType = new GraphQLObjectType({
  name: 'AyahCrossReference',
  fields: {
    ayah_id: { type: new GraphQLNonNull(GraphQLInt) },
    relationship: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const ScientificReferenceType = new GraphQLObjectType({
  name: 'ScientificReference',
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    summary: { type: new GraphQLNonNull(GraphQLString) },
    caution: { type: GraphQLString },
    references: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))) },
  },
});

const LegalRulingType = new GraphQLObjectType({
  name: 'LegalRuling',
  fields: {
    scope: { type: new GraphQLNonNull(GraphQLString) },
    summary: { type: new GraphQLNonNull(GraphQLString) },
    evidence: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))) },
  },
});

const LinguisticNoteType = new GraphQLObjectType({
  name: 'LinguisticNote',
  fields: {
    token: { type: new GraphQLNonNull(GraphQLString) },
    root: { type: GraphQLString },
    morphology: { type: GraphQLString },
    note: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const MisinterpretationNoteType = new GraphQLObjectType({
  name: 'MisinterpretationNote',
  fields: {
    claim: { type: new GraphQLNonNull(GraphQLString) },
    clarification: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const AyahKnowledgeType = new GraphQLObjectType({
  name: 'AyahKnowledge',
  fields: {
    ayah_id: { type: new GraphQLNonNull(GraphQLInt) },
    surah_id: { type: new GraphQLNonNull(GraphQLInt) },
    themes: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))) },
    historical_context: { type: new GraphQLNonNull(GraphQLString) },
    cross_references: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(AyahCrossReferenceType))),
    },
    scientific_references: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ScientificReferenceType))),
    },
    legal_rulings: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(LegalRulingType))),
    },
    linguistic_notes: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(LinguisticNoteType))),
    },
    misinterpretation_notes: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MisinterpretationNoteType))),
    },
  },
});

const ResolvedAyahType: GraphQLObjectType = new GraphQLObjectType({
  name: 'ResolvedAyah',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    number: { type: new GraphQLNonNull(GraphQLInt) },
    text: { type: new GraphQLNonNull(GraphQLString) },
    number_in_surah: { type: new GraphQLNonNull(GraphQLInt) },
    page: { type: new GraphQLNonNull(GraphQLInt) },
    surah_id: { type: new GraphQLNonNull(GraphQLInt) },
    hizb_id: { type: new GraphQLNonNull(GraphQLInt) },
    rub_id: { type: new GraphQLNonNull(GraphQLInt) },
    juz_id: { type: new GraphQLNonNull(GraphQLInt) },
    sajda: { type: new GraphQLNonNull(GraphQLBoolean) },
    translation: { type: GraphQLString },
    edition_content: { type: GraphQLString },
    edition: { type: EditionSummaryType },
    words: { type: new GraphQLList(new GraphQLNonNull(WordType)) },
    knowledge: { type: AyahKnowledgeType },
  }),
});

const SearchResultAyahType = new GraphQLObjectType({
  name: 'SearchResultAyah',
  fields: () => ({
    ...ResolvedAyahType.toConfig().fields,
    matched_identifiers: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))),
    },
  }),
});

const SurahType = new GraphQLObjectType({
  name: 'Surah',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    number: { type: new GraphQLNonNull(GraphQLInt) },
    name_ar: { type: new GraphQLNonNull(GraphQLString) },
    name_en: { type: new GraphQLNonNull(GraphQLString) },
    name_en_translation: { type: new GraphQLNonNull(GraphQLString) },
    type: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const SurahDetailType = new GraphQLObjectType({
  name: 'SurahDetail',
  fields: () => ({
    ...SurahType.toConfig().fields,
    ayahs: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ResolvedAyahType))) },
  }),
});

const PaginationMetaType = new GraphQLObjectType({
  name: 'PaginationMeta',
  fields: {
    total: { type: new GraphQLNonNull(GraphQLInt) },
    page: { type: GraphQLInt },
    limit: { type: GraphQLInt },
    total_pages: { type: GraphQLInt },
    has_next_page: { type: GraphQLBoolean },
  },
});

const SearchMetaType = new GraphQLObjectType({
  name: 'SearchMeta',
  fields: {
    total: { type: new GraphQLNonNull(GraphQLInt) },
    page: { type: new GraphQLNonNull(GraphQLInt) },
    limit: { type: new GraphQLNonNull(GraphQLInt) },
    total_pages: { type: new GraphQLNonNull(GraphQLInt) },
    has_next_page: { type: new GraphQLNonNull(GraphQLBoolean) },
    edition: { type: GraphQLString },
    language: { type: GraphQLString },
  },
});

const SurahConnectionType = new GraphQLObjectType({
  name: 'SurahConnection',
  fields: {
    items: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(SurahType))) },
    meta: { type: new GraphQLNonNull(PaginationMetaType) },
  },
});

const SearchConnectionType = new GraphQLObjectType({
  name: 'SearchConnection',
  fields: {
    items: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(SearchResultAyahType))) },
    meta: { type: new GraphQLNonNull(SearchMetaType) },
  },
});

const DivisionType = new GraphQLObjectType({
  name: 'Division',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    ayah_count: { type: new GraphQLNonNull(GraphQLInt) },
    start_ayah_number: { type: new GraphQLNonNull(GraphQLInt) },
    end_ayah_number: { type: new GraphQLNonNull(GraphQLInt) },
    start_page: { type: new GraphQLNonNull(GraphQLInt) },
    end_page: { type: new GraphQLNonNull(GraphQLInt) },
    surah_ids: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLInt))) },
    ayahs: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ResolvedAyahType))) },
  }),
});

const KnowledgeFaqType = new GraphQLObjectType({
  name: 'KnowledgeFaq',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    question: { type: new GraphQLNonNull(GraphQLString) },
    answer: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const ResearchReferenceType = new GraphQLObjectType({
  name: 'ResearchReference',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    author: { type: new GraphQLNonNull(GraphQLString) },
    type: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const DatasetCountsType = new GraphQLObjectType({
  name: 'DatasetCounts',
  fields: {
    surahs: { type: new GraphQLNonNull(GraphQLInt) },
    ayahs: { type: new GraphQLNonNull(GraphQLInt) },
    editions: { type: new GraphQLNonNull(GraphQLInt) },
    juzs: { type: new GraphQLNonNull(GraphQLInt) },
    hizbs: { type: new GraphQLNonNull(GraphQLInt) },
    rubs: { type: new GraphQLNonNull(GraphQLInt) },
    pages: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

const DatasetSourceType = new GraphQLObjectType({
  name: 'DatasetSource',
  fields: {
    sql_path: { type: new GraphQLNonNull(GraphQLString) },
    sha256: { type: new GraphQLNonNull(GraphQLString) },
    size_bytes: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

const DatasetMetadataType = new GraphQLObjectType({
  name: 'DatasetMetadata',
  fields: {
    source: { type: new GraphQLNonNull(DatasetSourceType) },
    generated_at: { type: new GraphQLNonNull(GraphQLString) },
    counts: { type: new GraphQLNonNull(DatasetCountsType) },
  },
});

const KnowledgeCoverageType = new GraphQLObjectType({
  name: 'KnowledgeCoverage',
  fields: {
    ayah_entries: { type: new GraphQLNonNull(GraphQLInt) },
    surah_profiles: { type: new GraphQLNonNull(GraphQLInt) },
    faq_entries: { type: new GraphQLNonNull(GraphQLInt) },
    research_references: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

const ApiMetaType = new GraphQLObjectType({
  name: 'ApiMeta',
  fields: {
    dataset: { type: new GraphQLNonNull(DatasetMetadataType) },
    knowledge: { type: new GraphQLNonNull(KnowledgeCoverageType) },
  },
});

export const quranGraphqlSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      surahs: {
        type: new GraphQLNonNull(SurahConnectionType),
        args: {
          page: { type: GraphQLInt },
          limit: { type: GraphQLInt },
        },
        resolve: (_source, args) => getAllSurahs(args.page ?? undefined, args.limit ?? undefined),
      },
      surah: {
        type: SurahDetailType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLInt) },
          edition: { type: GraphQLString },
        },
        resolve: (_source, args) => getSurahById(args.id, args.edition ?? undefined),
      },
      ayah: {
        type: ResolvedAyahType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLInt) },
          edition: { type: GraphQLString },
          includeWords: { type: GraphQLBoolean },
        },
        resolve: (_source, args) =>
          getAyah(args.id, args.edition ?? undefined, args.includeWords ?? false),
      },
      juz: {
        type: DivisionType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLInt) },
          edition: { type: GraphQLString },
        },
        resolve: (_source, args) => getJuzById(args.id, args.edition ?? undefined),
      },
      hizb: {
        type: DivisionType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLInt) },
          edition: { type: GraphQLString },
        },
        resolve: (_source, args) => getHizbById(args.id, args.edition ?? undefined),
      },
      rub: {
        type: DivisionType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLInt) },
          edition: { type: GraphQLString },
        },
        resolve: (_source, args) => getRubById(args.id, args.edition ?? undefined),
      },
      mushafPage: {
        type: DivisionType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLInt) },
          edition: { type: GraphQLString },
        },
        resolve: (_source, args) => getPageById(args.id, args.edition ?? undefined),
      },
      search: {
        type: new GraphQLNonNull(SearchConnectionType),
        args: {
          query: { type: new GraphQLNonNull(GraphQLString) },
          edition: { type: GraphQLString },
          language: { type: GraphQLString },
          page: { type: GraphQLInt },
          limit: { type: GraphQLInt },
        },
        resolve: (_source, args) => {
          if (args.edition && args.language) {
            throw new Error('Use either "edition" or "language", not both');
          }
          const edition = validateSearchEditionFilter(args.edition ?? null);
          const language = validateLanguageFilter(args.language ?? null);
          const result = searchAyahs(args.query, {
            edition: edition ?? undefined,
            language: language ?? undefined,
            page: args.page ?? 1,
            limit: args.limit ?? 50,
          });
          return {
            items: result.items,
            meta: {
              ...result.meta,
              edition,
              language,
            },
          };
        },
      },
      knowledge: {
        type: AyahKnowledgeType,
        args: {
          ayahId: { type: new GraphQLNonNull(GraphQLInt) },
        },
        resolve: (_source, args) => getKnowledgeByAyah(args.ayahId),
      },
      faqs: {
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(KnowledgeFaqType))),
        resolve: () => getKnowledgeFaqs(),
      },
      researchReferences: {
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ResearchReferenceType))),
        resolve: () => getResearchReferences(),
      },
      meta: {
        type: new GraphQLNonNull(ApiMetaType),
        resolve: () => ({
          dataset: getDatasetMetadata(),
          knowledge: getKnowledgeCoverage(),
        }),
      },
    },
  }),
});
