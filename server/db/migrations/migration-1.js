import pg from 'pg-promise'

const db = pg(process.env.GS_DB_URL || '')