import sql from './lib/postgres';

async function setup() {
  await sql/*sql*/ `CREATE TABLE IF NOT EXISTS short_links (
    id SERIAL PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    original_url TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`;

  await sql.end();

  console.log('Database setup complete');
}

setup();
