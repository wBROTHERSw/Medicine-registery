const express = require('express')
const MedicinesRouter = express.Router()
const fs = require('fs')

// Going to Medicines list
MedicinesRouter.get('/medicines', (req, res) => {

    fs.readFile('./data/medicines.json', (err, data) => {
        if (err) throw err

        const medicines = JSON.parse(data)

        res.render('medicines', { medicines: medicines })
    })    
})

// Update function
MedicinesRouter.get('/:id/update', (req, res) => {
    const id = req.params.id

    fs.readFile('./data/medicines.json', (err, data) => {
        if (err) throw err

        const medicines = JSON.parse(data)
        const medicine = medicines.filter(medicine => medicine.id == id)[0]

        const medicineIdx = medicines.indexOf(medicine)
        const splicedMedicine = medicines.splice(medicineIdx, 1)[0]

        splicedMedicine.status = true

        medicines.push(splicedMedicine)

        fs.writeFile('./data/medicines.json', JSON.stringify(medicines), (er) => {
            if (err) throw err

            res.render('medicines', { medicines: medicines})
        })
    })
})

// Delete information from the list
MedicinesRouter.get('/:id/delete', (req, res) => {
    const id = req.params.id

    fs.readFile('./data/medicines.json', (err, data) => {
        if (err) throw err

        const medicines = JSON.parse(data)

        const filteredMedicines = medicines.filter(medicines => medicines.id !=id)

        fs.writeFile('./data/medicines.json', JSON.stringify(filteredMedicines), (err) => {
            if (err) throw err

            res.render('medicines', { medicines: filteredMedicines, delete: true })
        })
    })
})



module.exports = MedicinesRouter