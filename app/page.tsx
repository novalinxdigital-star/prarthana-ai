"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw } from "lucide-react";
import PrayerCard from "@/components/PrayerCard";
import PrayerInput from "@/components/PrayerInput";
import Mandala from "@/components/Mandala";
import type { PrayerLanguage, PrayerResult } from "@/lib/types";

type ApiResult = PrayerResult & { id?: string | null };

export default function Home() {
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState<PrayerLanguage>("English");
  const [deity, setDeity] = useState("");
  const [result, setResult] = useState<ApiResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async (deityOverride?: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/generate-prayer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          situation: input,
          language,
          preferredDeity: deityOverride ?? deity,
        }),
      });
      const raw = await res.text();
      let json: any = null;
      try {
        json = JSON.parse(raw);
      } catch {
        throw new Error(
          "The server took too long or returned an error. Please try again."
        );
      }
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setResult(json);
      if (deityOverride) setDeity(deityOverride);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-indigo text-parchment p-4 md:p-12">
      <Mandala className="pointer-events-none absolute left-1/2 top-[-10rem] h-[44rem] w-[44rem] -translate-x-1/2 text-gold/10 animate-spin-slow" />

      <div className="relative max-w-4xl mx-auto space-y-12">
        <header className="text-center space-y-4 pt-6">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-display text-gold"
          >
            Prarthana AI
          </motion.h1>
          <p className="text-saffron text-xl font-light italic">
            “Speak From Your Heart. Find a Prayer.”
          </p>
        </header>

        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="input"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <PrayerInput
                value={input}
                onChange={setInput}
                language={language}
                onLanguageChange={setLanguage}
                deity={deity}
                onDeityChange={setDeity}
                onSubmit={() => generate()}
                loading={loading}
              />
              {error && (
                <p role="alert" className="text-center text-sm text-saffron">
                  {error}
                </p>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <PrayerCard
                data={result}
                shareUrl={result.id ? `/prayer/${result.id}` : null}
                onSelectDeity={loading ? undefined : (n) => generate(n)}
              />
              {loading && (
                <p className="text-center text-saffron italic">
                  Seeking guidance...
                </p>
              )}
              {error && (
                <p role="alert" className="text-center text-sm text-saffron">
                  {error}
                </p>
              )}
              <div className="text-center">
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 text-gold hover:text-saffron transition-colors"
                >
                  <RotateCcw className="h-4 w-4" /> Offer another prayer
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-[10px] text-center opacity-40 uppercase tracking-widest">
          Spiritual support is complementary to professional help. In
          emergencies, please seek medical attention.
        </p>
      </div>
    </main>
  );
}
