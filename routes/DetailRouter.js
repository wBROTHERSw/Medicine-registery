const express = require('express')
const DetailRouter = express.Router()
const fs = require('fs')

// Going to Medicine details page
DetailRouter.get('/medicines/:id', (req, res) => {
    const id = req.params.id

    fs.readFile('./data/medicines.json', (err, data) => {
        if (err) throw err

        const medicines = JSON.parse(data)

        const medicine = medicines.filter(medicine => medicine.id == id)[0]

        res.render('detail', { medicine: medicine })
    })
})

module.exports = DetailRouter