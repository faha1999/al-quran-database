const ARABIC_DIACRITICS_REGEX = /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED]/g;
const ARABIC_LETTER_NORMALIZATION: Record<string, string> = {
  ٱ: 'ا',
  أ: 'ا',
  إ: 'ا',
  آ: 'ا',
  ى: 'ي',
  ؤ: 'و',
  ئ: 'ي',
};

export function normalizeArabicText(value: string): string {
  return value
    .normalize('NFKD')
    .replace(ARABIC_DIACRITICS_REGEX, '')
    .replace(/ـ/g, '')
    .replace(/[ٱأإآىؤئ]/g, (char) => ARABIC_LETTER_NORMALIZATION[char] ?? char)
    .replace(/\s+/g, ' ')
    .trim();
}

export function normalizeSearchText(value: string): string {
  return normalizeArabicText(value).toLowerCase();
}
