export type PrayerLanguage =
  | "English"
  | "Hindi"
  | "Telugu"
  | "Malayalam"
  | "Tamil"
  | "Kannada";

export const LANGUAGES: PrayerLanguage[] = [
  "English",
  "Hindi",
  "Telugu",
  "Malayalam",
  "Tamil",
  "Kannada",
];

export interface PrayerResult {
  perspective: "self" | "others";
  recommendedDeity: { name: string; reason: string };
  alternatives: { name: string; reason?: string }[];
  scriptureReference: { source: string; verse: string; meaning: string };
  personalizedPrayer: string;
  mantra: { text: string; phonetic: string } | null;
  guidance: string;
  sources?: { title: string; url: string }[];
}

export interface SavedPrayer extends PrayerResult {
  situation: string;
  language: PrayerLanguage;
  createdAt: number;
}
