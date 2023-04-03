const express = require('express')
const HomeRouter = express.Router();

// localhost:3000
HomeRouter.get('/', (req, res) => {
    res.render('home')
})

// URL endpoint
HomeRouter.get('/api/v1/medicines', (req, res) => {
    
    fs.readFile('./data/medicines.json', (err, data) => {
        if (err) throw err

        const medicines = JSON.parse(data)

        res.json(medicines)
    })
})

module.exports = HomeRouter;