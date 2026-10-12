"use client";

interface Props {
  alternatives: { name: string; reason?: string }[];
  onSelect?: (name: string) => void;
}

/** Shows alternative deities; clicking one asks the parent to regenerate. */
export default function DeitySelector({ alternatives, onSelect }: Props) {
  if (!alternatives.length) return null;

  return (
    <section>
      <h4 className="text-saffron font-bold flex items-center gap-2">
        <span className="h-px w-8 bg-saffron" /> Other Paths of Devotion
      </h4>
      <div className="mt-3 flex flex-wrap gap-2">
        {alternatives.map((d) => (
          <button
            key={d.name}
            type="button"
            title={d.reason}
            onClick={() => onSelect?.(d.name)}
            disabled={!onSelect}
            className="rounded-full border border-gold/60 px-4 py-1.5 text-sm text-indigo hover:bg-gold/20 disabled:hover:bg-transparent disabled:cursor-default transition-colors"
          >
            {d.name}
          </button>
        ))}
      </div>
      {alternatives.some((d) => d.reason) && (
        <ul className="mt-3 space-y-1 text-xs text-gray-600">
          {alternatives.map(
            (d) =>
              d.reason && (
                <li key={d.name}>
                  <span className="font-semibold">{d.name}:</span> {d.reason}
                </li>
              )
          )}
        </ul>
      )}
    </section>
  );
}
