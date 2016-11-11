import UserRepo from './userRepo'
import Promise from 'promise'
import jwt from 'jsonwebtoken'

export default class UserService {
	constructor() {
		
		this.UserRepo = new UserRepo()
	}

	createUser (body) {
		let promise = Promise.reject('Invalid Login'),
			userType

		if (body.username && body.password) {
			promise = this.UserRepo.getUserByUsername(body.username)
			userType = 'username'
		} else if (body.steam_id) {
			promise = this.UserRepo.getUserBySteamId(body.steam_id)
			userType = 'steam'
		}

		// check if user exists
		return promise.then((results) => {
			if (results.length > 0) {
				// user exists, verify password
				if (userType === 'steam' || this.UserRepo.verifyPassword(body.password, results[0])) {
					return results[0]
				} else {
					return Promise.reject('Invalid Login')
				}
			} else {
				// user doesn't exist, create user
				return this.UserRepo.createUser(body).then(() => {
					return userType === 'username' ? this.UserRepo.getUserByUsername(body.username) : this.UserRepo.getUserBySteamId(body.steam_id) 
				}).then((results) => {
					return results[0]
				})
			}
		}).then((user) => {
			delete user.id
			delete user.hashed_password
			delete user.salt
			user.token = jwt.sign(user, process.env['GS_SECRETKEY'])
			return user
		}).catch((error) => {
			console.log(error)
			return Promise.reject(error)
		})
	}
}