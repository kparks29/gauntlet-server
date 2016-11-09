import express from 'express'

const app = express(),
	port = process.env.PORT || 8081

app.get('/', function (req, res) {
	res.send('Hello World!')
})

app.listen(port, () => {
	console.log(`Server listening on port ${port}`)
})