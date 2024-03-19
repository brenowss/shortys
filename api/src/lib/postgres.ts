import postgres from 'postgres';

// Connect to the database
const sql = postgres('postgresql://root:root@localhost', {
  username: 'root',
  password: 'root',
  database: 'shortys',
  port: 5432,
  host: 'localhost',
});

// Export the database connection
export default sql;
