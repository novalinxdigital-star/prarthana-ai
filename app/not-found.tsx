import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-indigo text-parchment flex flex-col items-center justify-center gap-6 p-8 text-center">
      <h1 className="text-4xl font-display text-gold">Prayer not found</h1>
      <p className="text-saffron italic">
        This prayer may have faded like a lamp at dawn.
      </p>
      <Link
        href="/"
        className="bg-saffron hover:bg-gold text-indigo px-8 py-3 rounded-full font-bold transition-colors"
      >
        Return home
      </Link>
    </main>
  );
}
