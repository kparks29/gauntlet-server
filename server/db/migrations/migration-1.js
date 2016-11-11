import pgp from 'pg-promise'

const pg = pgp()
const db = pg({
	user: process.env['GS_DB_USER'],
    password: process.env['GS_DB_PASS'],
    database: process.env['GS_DB'],
    port: process.env['GS_DB_PORT'],
    host: process.env['GS_DB_HOST'],
    ssl: true
})

let migration = db.tx((tx) => {
	let queries = [
		`CREATE TABLE users (
			id SERIAL PRIMARY KEY,
			uuid UUID,
			username TEXT,
			salt VARCHAR(80),
			hashed_password VARCHAR(255),
			steam_id VARCHAR(255)
		);`
	]

	return tx.batch(queries.map((query) => {
		return tx.none(query, [])
	}))
})

export default migration