require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const connectDB = require('./db/connection')
const notFoundMiddleware = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')

const notesRouter = require('./routes/notes-router')

app.use(express.json())
app.use('/api/v1/notes', notesRouter)

app.use(errorHandler)
app.use(notFoundMiddleware)



const port = process.env.PORT || 3000


const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is listening on ${port}...`)
        })
    }
    catch(error){
        console.log(error)
    }
}

start()