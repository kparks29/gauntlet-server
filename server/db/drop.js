import pgp from 'pg-promise'
import fs from 'fs'
import config from '../../package.json'

const pg = pgp()
const db = pg({
	user: process.env['GS_DB_USER'],
    password: process.env['GS_DB_PASS'],
    database: process.env['GS_DB'],
    port: process.env['GS_DB_PORT'],
    host: process.env['GS_DB_HOST'],
    ssl: true
})

db.tx((tx) => {
	let queries = [
		`DROP TABLE IF EXISTS users;`
	]

	return tx.batch(queries.map((query) => {
		return tx.none(query, [])
	}))
}).then(() => {
    console.log('Successfully dropped tables')
    config.currentMigration = 0
    fs.writeFileSync('./package.json', JSON.stringify(config, null, 2))
    process.exit()
}).catch((error) => {
    console.log('Error dropping tables', error)
    process.exit(1)
})