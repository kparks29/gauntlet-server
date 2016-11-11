import Controller from '../models/controllerModel'
import CharacterService from './characterService'

export default class CharacterController extends Controller {
	constructor() {
		super()

		this.getCharacters = this.getCharacters.bind(this)
		this.createCharacter = this.createCharacter.bind(this)
		this.updateCharacter = this.updateCharacter.bind(this)
		
		this.CharacterService = new CharacterService()
		this.router.use(this.verifyToken)
		this.router.get('/', this.getCharacters)
		this.router.post('/', this.createCharacter)
		this.router.put('/', this.updateCharacter)
	}

	getCharacters (req, res) {
		this.CharacterService.getCharacters(req.user.id).then((success) => {
			res.status(201).send(success);
		}).catch((error) => {
			res.status(400).send(error);
		});
	}

	createCharacter (req, res) {
		this.CharacterService.createCharacter(req.user.id, req.body).then((success) => {
			res.status(201).send(success);
		}).catch((error) => {
			res.status(400).send(error);
		});
	}

	updateCharacter (req, res) {
		this.CharacterService.updateCharacter(req.body).then((success) => {
			res.status(201).send(success);
		}).catch((error) => {
			res.status(400).send(error);
		});
	}
}