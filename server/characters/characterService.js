import CharacterRepo from './characterRepo'
import Promise from 'promise'

export default class UserService {
	constructor() {
		
		this.CharacterRepo = new CharacterRepo()
	}

	getCharacters (userId) {
		
		return this.CharacterRepo.getCharactersByUserId(userId).then((results) => {
			return results
		}).catch((error) => {
			console.log(error)
			return Promise.reject('Could not get characters')
		})
	}

	createCharacter (userId, character) {
		if (!character.class) {
			return Promise.reject('Missing Class')
		}

		if (!userId) {
			return Promise.reject('Missing User Id')
		}

		character.user_id = userId
		character.level = 1
		character.experience = 0

		if (character.class === 'wizard') {
			character.strength = 30
			character.defense = 40
			character.magic = 100
			character.max_health = 400
		} else if (character.class === 'warrior') {
			character.strength = 90
			character.defense = 50
			character.magic = 30
			character.max_health = 600
		} else if (character.class === 'archer') {
			character.strength = 70
			character.defense = 60
			character.magic = 40
			character.max_health = 500
		} else {
			return Promise.reject('Invalid Class')
		}

		return this.CharacterRepo.createCharacter(character).then((results) => {
			return results[0]
		}).catch((error) => {
			console.log(error)
			return Promise.reject('Could not create character')
		})
	}

	updateCharacter (characterUuid, character) {
		let allowedProperties = [
			'name',
			'level',
			'experience',
			'strength',
			'defense',
			'magic',
			'max_health'
		]

		for (let key of Object.keys(character)) {
			if (!allowedProperties.includes(key)) {
				return this.promise.reject(`Property not allowed "${key}"`);
			}
		}

		return this.CharacterRepo.updateCharacterByUuid(characterUuid, character).then((results) => {
			console.log(results)
		}).catch((error) => {
			console.log(error)
			return Promise.reject('Could not update character')
		})
	}
}