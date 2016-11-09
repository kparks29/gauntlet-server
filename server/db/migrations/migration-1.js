import pgp from 'pg-promise'

const pg = pgp()
const db = pg(process.env['GS_DB_URL'] || '')

let migration = db.tx((tx) => {
	let queries = [
		`CREATE TABLE users (
			id SERIAL NOT NULL,
			username TEXT,
			salt UUID,
			hashed_password UUID,
			steam_id UUID
		);`
	]

	return tx.batch(queries.map((query) => {
		return tx.none(query, [])
	}))
})

export default migration