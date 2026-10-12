"use client";

import { motion } from "framer-motion";
import { Copy, Check, Share2 } from "lucide-react";
import { useState } from "react";
import type { PrayerResult } from "@/lib/types";
import DeitySelector from "./DeitySelector";
import Mandala from "./Mandala";

interface Props {
  data: PrayerResult;
  shareUrl?: string | null;
  onSelectDeity?: (name: string) => void;
}

export default function PrayerCard({ data, shareUrl, onSelectDeity }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const text = [
      data.recommendedDeity.name,
      "",
      data.personalizedPrayer,
      data.mantra ? `\n${data.mantra.text}\n${data.mantra.phonetic}` : "",
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const share = async () => {
    if (!shareUrl) return;
    const url = `${window.location.origin}${shareUrl}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "A prayer from Prarthana AI", url });
        return;
      } catch {
        /* cancelled */
      }
    }
    await navigator.clipboard.writeText(url).catch(() => {});
  };

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="diya-glow animate-flicker" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative overflow-hidden bg-parchment border-t-4 border-saffron shadow-2xl rounded-xl p-8 text-indigo"
      >
        <Mandala className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 text-gold/20 animate-spin-slow" />

        <div className="relative text-center mb-8">
          <span className="text-gold font-display uppercase tracking-widest text-sm">
            Divine Connection
          </span>
          <h2 className="text-3xl font-display text-indigo mt-2 italic">
            {data.recommendedDeity.name}
          </h2>
          <p className="mt-3 text-sm text-indigo-soft/80 max-w-md mx-auto">
            {data.recommendedDeity.reason}
          </p>
        </div>

        {/* The centerpiece prayer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.2 }}
          className="relative bg-indigo/5 p-6 rounded-lg italic font-serif text-lg leading-relaxed text-indigo-soft mb-8 whitespace-pre-line"
        >
          {data.personalizedPrayer}
        </motion.div>

        <div className="relative space-y-6">
          {data.scriptureReference?.source && (
            <section>
              <h4 className="text-saffron font-bold flex items-center gap-2">
                <span className="h-px w-8 bg-saffron" /> Scriptural Wisdom
              </h4>
              <p className="text-sm font-semibold mt-2">
                {data.scriptureReference.source}
              </p>
              {data.scriptureReference.verse && (
                <p className="text-sm italic text-gray-600 mt-1">
                  “{data.scriptureReference.verse}”
                </p>
              )}
              {data.scriptureReference.meaning && (
                <p className="text-sm text-gray-700 mt-2">
                  {data.scriptureReference.meaning}
                </p>
              )}
            </section>
          )}

          {data.mantra && (
            <div className="bg-indigo text-parchment p-4 rounded-md text-center border border-gold">
              <p className="text-xl tracking-widest mb-1">{data.mantra.text}</p>
              {data.mantra.phonetic && (
                <p className="text-sm italic opacity-80 mb-1">
                  {data.mantra.phonetic}
                </p>
              )}
              <p className="text-[10px] uppercase opacity-60">
                Sacred Sound Vibration
              </p>
            </div>
          )}

          {data.guidance && (
            <section>
              <h4 className="text-saffron font-bold flex items-center gap-2">
                <span className="h-px w-8 bg-saffron" /> Guidance
              </h4>
              <p className="text-sm text-gray-700 mt-2 whitespace-pre-line">
                {data.guidance}
              </p>
            </section>
          )}

          <DeitySelector
            alternatives={data.alternatives}
            onSelect={onSelectDeity}
          />

          {data.sources && data.sources.length > 0 && (
            <section>
              <h4 className="text-xs uppercase tracking-widest text-gray-500">
                Sources consulted
              </h4>
              <ul className="mt-2 space-y-1 text-xs">
                {data.sources.slice(0, 5).map((s) => (
                  <li key={s.url} className="truncate">
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 underline decoration-gold/60 hover:text-saffron"
                    >
                      {s.title || s.url}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="flex gap-3 pt-2 border-t border-gold/30">
            <button
              onClick={copy}
              className="flex items-center gap-2 text-sm text-indigo-soft hover:text-saffron transition-colors"
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              {copied ? "Copied" : "Copy prayer"}
            </button>
            {shareUrl && (
              <button
                onClick={share}
                className="flex items-center gap-2 text-sm text-indigo-soft hover:text-saffron transition-colors"
              >
                <Share2 className="h-4 w-4" /> Share
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
