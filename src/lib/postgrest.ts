import { PostgrestClient } from "@supabase/postgrest-js";

const POSTGREST_URL = process.env.POSTGREST_URL || "";
const POSTGREST_SCHEMA = process.env.POSTGREST_SCHEMA || "public";
const POSTGREST_API_KEY = process.env.POSTGREST_API_KEY || "";

export function createPostgrestClient() {
  if (!POSTGREST_URL) {
    console.error('[PostgREST] POSTGREST_URL is not set!');
    throw new Error('POSTGREST_URL environment variable is required');
  }

  console.log('[PostgREST] Creating client with URL:', POSTGREST_URL);
  console.log('[PostgREST] Using schema:', POSTGREST_SCHEMA);
  console.log('[PostgREST] API key present:', !!POSTGREST_API_KEY);

  const client = new PostgrestClient(POSTGREST_URL, {
    schema: POSTGREST_SCHEMA,
    fetch: (...args) => {
      let [url, options] = args;

      if (url instanceof URL || typeof url === "string") {
        const urlObj = url instanceof URL ? url : new URL(url);
        const columns = urlObj.searchParams.get("columns");

        if (columns && columns.includes('"')) {
          const fixedColumns = columns.replace(/"/g, "");
          urlObj.searchParams.set("columns", fixedColumns);
          url = urlObj.toString();
        }
      }

      console.log('[PostgREST] Fetching:', typeof url === 'string' ? url : url.toString());
      return fetch(url, {
        ...options,
      } as RequestInit);
    },
  });

  client.headers.set("Content-Type", "application/json");

  if (POSTGREST_API_KEY) {
    client.headers.set("apikey", POSTGREST_API_KEY);
    client.headers.set("Authorization", `Bearer ${POSTGREST_API_KEY}`);
  } else {
    console.warn('[PostgREST] No API key found - requests may fail!');
  }
  return client;
}
