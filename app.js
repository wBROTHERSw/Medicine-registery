const express = require('express')
const app = express()
const PORT = 3000

const fs = require('fs')

app.set('view engine', 'pug')

app.use('/static', express.static('public'))
app.use(express.urlencoded({ extended: false }))

// Run the application using - localhost:3000
app.get('/', (req, res) => {
    res.render('home')
})

// Going to the registering page
app.get('/add', (req, res) => {
    res.render('add')
})

// Adding the object to the list and giving an id
app.post('/add', (req, res) => {
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

// URL endpoint
app.get('/api/v1/medicines', (req, res) => {
    
    fs.readFile('./data/medicines.json', (err, data) => {
        if (err) throw err

        const medicines = JSON.parse(data)

        res.json(medicines)
    })
})

// Going to Medicines list
app.get('/medicines', (req, res) => {

    fs.readFile('./data/medicines.json', (err, data) => {
        if (err) throw err

        const medicines = JSON.parse(data)

        res.render('medicines', { medicines: medicines })
    })    
})

// Going to Medicine details page
app.get('/medicines/:id', (req, res) => {
    const id = req.params.id

    fs.readFile('./data/medicines.json', (err, data) => {
        if (err) throw err

        const medicines = JSON.parse(data)

        const medicine = medicines.filter(medicine => medicine.id == id)[0]

        res.render('detail', { medicine: medicine })
    })
})

// Update function
app.get('/:id/update', (req, res) => {
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
app.get('/:id/delete', (req, res) => {
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

// App run port
app.listen(PORT, (err) => {
    if (err) throw err

    console.log(`Programm is running ${PORT}`)
})

function id () {
    return '_' + Math.random().toString(36).substr()
}