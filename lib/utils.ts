import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAyahNumber(surahNumber: number, ayahNumber: number) {
  return `${surahNumber}:${ayahNumber}`;
}
