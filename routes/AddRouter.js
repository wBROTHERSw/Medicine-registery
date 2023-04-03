const express = require('express')
const AddRouter = express.Router()
const fs = require('fs')

// Going to the registering page
AddRouter.get('/add', (req, res) => {
    res.render('add')
})

// Adding the object to the list and giving an id
AddRouter.post('/add', (req, res) => {
    const title = req.body.title
    const instruction = req.body.instruction
    const number = req.body.number
    const supplier = req.body.supplier
    const status = req.body

    if (title.trim() === '' && instruction.trim() === '' && number.trim() === '' && supplier.trim() === '' && status.trim() === '') {
        res.render('add', { error: true })
    } else {
        fs.readFile('./data/medicines.json', (err, data) => {
            if (err) throw err

            const medicines = JSON.parse(data)

            medicines.push({
                id: id (),
                title: title,
                instruction: instruction,
                number: number,
                supplier: supplier,
                status: false,
            })

            fs.writeFile('./data/medicines.json', JSON.stringify(medicines), err => {
                if (err) throw err

                res.render('add', { success: true })
            })
        })
    }
})

function id () {
    return '_' + Math.random().toString(36).substr()
}

module.exports = AddRouter