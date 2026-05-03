import surahsData from './data/surahs.json';
import ayahsData from './data/ayahs.json';

export interface Surah {
  id: number;
  number: number;
  name_ar: string;
  name_en: string;
  name_en_translation: string;
  type: string;
}

export interface Ayah {
  id: number;
  number: number;
  text: string;
  number_in_surah: number;
  page: number;
  surah_id: number;
  juz_id: number;
  sajda: boolean;
}

export function getAllSurahs(): Surah[] {
  return surahsData;
}

export function getSurahById(id: number): (Surah & { ayahs: Ayah[] }) | null {
  const surah = surahsData.find(s => s.id === id || s.number === id);
  if (!surah) return null;
  
  const ayahs = ayahsData.filter(a => a.surah_id === surah.id);
  return { ...surah, ayahs };
}

export function getAyahByNumber(number: number): Ayah | null {
  return ayahsData.find(a => a.number === number) || null;
}

export function searchAyahs(query: string): Ayah[] {
  if (!query) return [];
  const lowerQuery = query.toLowerCase();
  return ayahsData.filter(a => 
    a.text.toLowerCase().includes(lowerQuery)
  ).slice(0, 50); // Limit results for MVP
}
