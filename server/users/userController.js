import Controller from '../models/controllerModel'
import UserService from './userService'

export default class UserController extends Controller {
	constructor() {
		super()

		this.createUser = this.createUser.bind(this)
		
		this.UserService = new UserService()
		this.router.post('/', this.createUser)
	}

	createUser (req, res) {
		this.UserService.createUser(req.body).then((success) => {
			res.status(201).send(success);
		}).catch((error) => {
			res.status(400).send(error);
		});
	}
}