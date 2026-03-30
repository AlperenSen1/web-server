import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import * as schema from "./schema";
import path from "node:path";

// import.meta.dir bu dosyanın (db klasörünün) bulunduğu tam yolu verir.
// path.join ile bir üst klasöre çıkıp database.sqlite dosyasını hedefliyoruz.
const dbPath = path.join(import.meta.dir, "../database.sqlite");
const sqlite = new Database(dbPath);

export const db = drizzle(sqlite, { schema });

export * from "./schema";
