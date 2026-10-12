import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  type Firestore,
} from "firebase/firestore";
import type { SavedPrayer } from "./types";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const firebaseConfigured = Boolean(config.apiKey && config.projectId);

let db: Firestore | null = null;

function getDb(): Firestore | null {
  if (!firebaseConfigured) return null;
  if (!db) {
    const app: FirebaseApp = getApps()[0] ?? initializeApp(config);
    db = getFirestore(app);
  }
  return db;
}

/** Saves a prayer; returns its id, or null if Firestore isn't configured. */
export async function savePrayer(prayer: SavedPrayer): Promise<string | null> {
  const firestore = getDb();
  if (!firestore) return null;
  const ref = await addDoc(collection(firestore, "prayers"), prayer);
  return ref.id;
}

export async function getPrayer(id: string): Promise<SavedPrayer | null> {
  const firestore = getDb();
  if (!firestore) return null;
  const snap = await getDoc(doc(firestore, "prayers", id));
  return snap.exists() ? (snap.data() as SavedPrayer) : null;
}
