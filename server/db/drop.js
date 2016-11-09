import pgp from 'pg-promise'

const pg = pgp()
const db = pg(process.env['GS_DB_URL'] || '')

db.tx((tx) => {
	let queries = [
		`DROP TABLE IF EXISTS users;`
	]

	return tx.batch(queries.map((query) => {
		return tx.none(query, [])
	}))
}).then(() => {
    console.log('Migration 1 Complete')
}).catch((error) => {
    console.log('Error migrating migration 1', error)
})