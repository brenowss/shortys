import sql from './lib/postgres';

async function dropTable() {
  await sql/*sql*/ `DROP TABLE IF EXISTS short_links`;

  await sql.end();

  console.log('Database dropped successfully');
}

dropTable();
