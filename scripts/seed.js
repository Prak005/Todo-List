require('dotenv').config();
const { Client } = require('pg');

const SQL = `
    CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        text TEXT NOT NULL,
        completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

async function main(){
    console.log('seeding...');
    const connectionString = 
        process.env.DATABASE_URL || 
        `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
    
    const client = new Client({
        connectionString,
        ssl: process.env.DATABASE_URL
            ? { rejectUnauthorized: false }
            : false,
    });

    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log('done');
}

main();