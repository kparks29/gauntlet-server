import characterQueries from './characterQueries'
import pgp from 'pg-promise'
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


export default class CharacterRepo {
	constructor() {
		
	}

	getCharactersByUserId (userId) {
		return db.any(characterQueries.getCharactersByUserId, userId)
	}

	createCharacter (character) {
		return db.any(characterQueries.createCharacter, [uuid.v4(), character.name, character.class, character.level, character.experience, character.strength, character.defense, character.magic, character.max_health, character.user_id])
	}

	updateCharacterByUuid (characterUuid, character) {
		return db.any(characterQueries.updateCharacterByUuid, [character, characterUuid])
	}
}
