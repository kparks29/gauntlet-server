import pgp from 'pg-promise'

const pg = pgp()
const db = pg(process.env['GS_DB_URL'] || '')

db.tx(() => {
	let queries = [
		`DROP TABLE IF EXISTS users;`
	]

	return this.batch(queries.map((query) => {
		return this.none(query, [])
	}))
}).then(() => {
    console.log('Migration 1 Complete')
}).catch((error) => {
    console.log('Error migrating migration 1', error)
})