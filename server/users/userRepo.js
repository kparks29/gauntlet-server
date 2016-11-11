import userQueries from './userQueries'
import pgp from 'pg-promise'
import bcrypt from 'bcrypt-nodejs';
import uuid from 'uuid'

const pg = pgp()
const db = pg({
	user: process.env['GS_DB_USER'],
    password: process.env['GS_DB_PASS'],
    database: process.env['GS_DB'],
    port: process.env['GS_DB_PORT'],
    host: process.env['GS_DB_HOST'],
    ssl: true
})


export default class UserRepo {
	constructor() {
		
	}

	getUserByUsername (username) {
		return db.any(userQueries.getUserByUsername, username)
	}

	getUserBySteamId (steamId) {
		return db.any(userQueries.getUserBySteamId, steamId)
	}

	createUser (user) {
		user.salt = bcrypt.genSaltSync()
		if (user.username) {
			user.hashed_password = bcrypt.hashSync(user.password, user.salt)
			delete user.password
		}
		return db.any(userQueries.createUser, [user.username, user.salt, user.hashed_password, user.steam_id, uuid.v1()])
	}

	verifyPassword (password, user) {
		return user.hashed_password === bcrypt.hashSync(password, user.salt)
	}
}
