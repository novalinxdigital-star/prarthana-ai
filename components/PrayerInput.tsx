"use client";

import { Sparkles, Loader2 } from "lucide-react";
import { LANGUAGES, type PrayerLanguage } from "@/lib/types";

interface Props {
  value: string;
  onChange: (v: string) => void;
  language: PrayerLanguage;
  onLanguageChange: (l: PrayerLanguage) => void;
  deity: string;
  onDeityChange: (d: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

const DEITIES = [
  "Ganesha",
  "Shiva",
  "Vishnu",
  "Lakshmi",
  "Hanuman",
  "Durga",
  "Saraswati",
  "Krishna",
  "Rama",
  "Ayyappan",
  "Venkateswara",
];

export default function PrayerInput({
  value,
  onChange,
  language,
  onLanguageChange,
  deity,
  onDeityChange,
  onSubmit,
  loading,
}: Props) {
  const canSubmit = value.trim().length >= 5 && !loading;

  return (
    <div className="space-y-4">
      <div className="relative">
        <textarea
          aria-label="Describe your situation"
          maxLength={2000}
          className="w-full h-64 bg-parchment/5 border border-gold/30 rounded-2xl p-6 pb-24 text-xl leading-relaxed placeholder:text-parchment/40 focus:ring-2 ring-saffron outline-none transition-all resize-none"
          placeholder="Describe your situation... (e.g., 'I am feeling anxious about my child's health' or 'I seek strength to overcome financial struggles')"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter" && canSubmit)
              onSubmit();
          }}
        />
        <button
          onClick={onSubmit}
          disabled={!canSubmit}
          className="absolute bottom-6 right-6 bg-saffron hover:bg-gold disabled:opacity-50 disabled:cursor-not-allowed text-indigo px-8 py-3 rounded-full font-bold transition-colors flex items-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Seeking Guidance...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" /> Find My Prayer
            </>
          )}
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block text-sm text-gold/90">
          Language of prayer
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as PrayerLanguage)}
            className="mt-1 w-full bg-indigo-deep border border-gold/30 rounded-lg px-3 py-2 text-parchment focus:ring-2 ring-saffron outline-none"
          >
            {LANGUAGES.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm text-gold/90">
          Preferred deity (optional)
          <input
            list="deity-list"
            value={deity}
            onChange={(e) => onDeityChange(e.target.value)}
            placeholder="Let the Shastras guide"
            className="mt-1 w-full bg-indigo-deep border border-gold/30 rounded-lg px-3 py-2 text-parchment placeholder:text-parchment/40 focus:ring-2 ring-saffron outline-none"
          />
          <datalist id="deity-list">
            {DEITIES.map((d) => (
              <option key={d} value={d} />
            ))}
          </datalist>
        </label>
      </div>
    </div>
  );
}
