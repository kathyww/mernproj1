const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000 // find PORT var in .env file or use port 5000

const app = express() //initialize express, object app

app.use(express.json())
app.use(express.urlencoded({ extended : false})) // add middleware


app.use('/api/goals', require('./routes/goalRoutes')) // when hit api/goals will look into the goalRoutes file

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))


