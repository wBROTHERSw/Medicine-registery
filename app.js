const express = require('express')
const app = express()
const HomeRouter = require("./routes/HomeRouter.js")
const AddRouter = require('./routes/AddRouter.js')
const MedicinesRouter = require('./routes/MedicinesRouter.js')
const DetailRouter = require('./routes/DetailRouter.js')
const PORT = 3000

app.set('view engine', 'pug')

app.use('/static', express.static('public'))
app.use(express.urlencoded({ extended: false }))

// Router
app.use("/", HomeRouter)
app.use("/", AddRouter)
app.use("/", MedicinesRouter)
app.use("/", DetailRouter)

// App run port
app.listen(PORT, (err) => {
    if (err) throw err

    console.log(`Programm is running ${PORT}`)
})