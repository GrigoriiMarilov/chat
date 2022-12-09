require('dotenv').config()

const models = require("./models/models")
const express = require('express')
const sequelize = require("./db");
const cors = require("cors");
const router = require('./routes/router.js');
const errorHandler = require('./middleware/ErrorHandlingMW')


const PORT = process.env.PORT || 5000
const app = express()
app.use(express.static('public'))
app.use(express.json())
app.use(cors({ exposedHeaders: "Length" }))
app.use("/", router)

const start = async () => {
	try {
		await sequelize.authenticate()
		await sequelize.sync({ alter: true })
		app.listen(PORT, () => console.log('server started on port ' + PORT))

	} catch (error) {
		console.log(error.message)
	}
}
start()