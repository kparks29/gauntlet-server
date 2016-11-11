import Controller from '../models/controllerModel'
import UserService from './userService'

export default class UserController extends Controller {
	constructor() {
		super()
		
		this.UserService = new UserService()
		this.router.get('/users', this.getUsers)
	}

	createUser (req, res) {
		let promise = this.promise.reject('Invalid Login')
		if (req.body.username) {
			promise = this.UserService.getUserByUsername(req.body.username)
		} else if (req.body.steam_id) {
			promise = this.UserService.getUserBySteamId(req.body.steam_id)
		}

		this.UserService.createUser(req.body).then((success) => {
			res.status(200).send(success);
		}).catch((error) => {
			res.status(400).send(error);
		});
	}
}