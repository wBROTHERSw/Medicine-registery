const express = require('express')
const app = express()
const PORT = 6000

app.set('view engine', 'pug')

app.get('/', (req,res) => {
    res.render('home', { todos: todos })    
})

app.listen(PORT, (err) => {
    if (err) throw err

    console.log(`Programm is running ${PORT}`)
})