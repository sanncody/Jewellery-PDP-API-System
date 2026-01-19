const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
});


pool.connect()
.then(() => {
    console.log('Connected to PostgreSQL database successfully✅ ');
}).catch(err => {
    console.error('Error connecting to Postgres DB ❌', err);
});

module.exports = pool;