/** Decorative SVG mandala. Purely ornamental. */
export default function Mandala({
  className = "",
}: {
  className?: string;
}) {
  const petals = Array.from({ length: 12 }, (_, i) => i * 30);
  const inner = Array.from({ length: 8 }, (_, i) => i * 45);
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.6"
      aria-hidden="true"
    >
      <circle cx="100" cy="100" r="96" />
      <circle cx="100" cy="100" r="88" strokeDasharray="1 3" />
      {petals.map((a) => (
        <ellipse
          key={a}
          cx="100"
          cy="46"
          rx="9"
          ry="30"
          transform={`rotate(${a} 100 100)`}
        />
      ))}
      {inner.map((a) => (
        <ellipse
          key={a}
          cx="100"
          cy="70"
          rx="6"
          ry="18"
          transform={`rotate(${a} 100 100)`}
        />
      ))}
      <circle cx="100" cy="100" r="22" />
      <circle cx="100" cy="100" r="10" />
      <circle cx="100" cy="100" r="3" fill="currentColor" />
    </svg>
  );
}
