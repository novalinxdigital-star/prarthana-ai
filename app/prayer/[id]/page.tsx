import Link from "next/link";
import { notFound } from "next/navigation";
import PrayerCard from "@/components/PrayerCard";
import { getPrayer } from "@/lib/firebase";

export const dynamic = "force-dynamic";

export default async function PrayerPage({
  params,
}: {
  params: { id: string };
}) {
  let prayer = null;
  try {
    prayer = await getPrayer(params.id);
  } catch {
    prayer = null;
  }
  if (!prayer) notFound();

  return (
    <main className="min-h-screen bg-indigo text-parchment p-4 md:p-12">
      <div className="max-w-4xl mx-auto space-y-10">
        <header className="text-center space-y-2">
          <Link href="/" className="text-4xl md:text-5xl font-display text-gold">
            Prarthana AI
          </Link>
          <p className="text-saffron italic">A prayer shared with you</p>
        </header>

        <PrayerCard data={prayer} />

        <div className="text-center">
          <Link
            href="/"
            className="inline-block bg-saffron hover:bg-gold text-indigo px-8 py-3 rounded-full font-bold transition-colors"
          >
            Find your own prayer
          </Link>
        </div>
      </div>
    </main>
  );
}
