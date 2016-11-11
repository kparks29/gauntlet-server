import express from 'express'
import bodyParser from 'body-parser'
import UserController from './users/userController.js'

const app = express(),
	port = process.env['PORT'] || 8081

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/users', new UserController().router)

app.listen(port, () => {
	console.log(`Server listening on port ${port}`)
})