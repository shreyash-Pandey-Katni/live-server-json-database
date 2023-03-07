#!/usr/bin/env node

const yargs = require("yargs");


const options = yargs
    .usage("Usage: -f fileName")
    .option("f", { alias: "fileName", describe: "File name", type: "string", demandOption: true })
    .option("p", { alias: "port", describe: "Port", type: "number", demandOption: true })
    .argv;

const fs = require('fs');
const path = require('path');
const fileName = options.fileName;
const filePath = path.join(__dirname, fileName);

const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser")
// route

const saveData = (data) => {
    const stringData = JSON.stringify(data)
    fs.writeFileSync(filePath, stringData)
}

const loadData = () => {
    try {
        const jsonData = fs.readFileSync(filePath)
        return JSON.parse(jsonData)
    } catch (e) {
        console.log(e);
        return []
    }
}

router.post('/addData', (req, res) => {
    try {
        var existingAccounts = loadData()
        const newAccountId = Math.floor(Math.random() * 1000000000 + 1)
        existingAccounts[newAccountId] = req.body
        saveData(existingAccounts)
        res.send({ success: true, msg: "Account added" })
    } catch (e) {
        console.log(e);
        res.send({ success: false, msg: "Account not added" })
    }
})

router.get('/listData', (req, res) => {
    try {
        var existingAccounts = loadData()
        res.send(existingAccounts)
    }
    catch (e) {
        console.log(e);
        res.send({ success: false, msg: "Account not found" })
    }
})

router.get('/deleteData', (req, res) => {
    try {
        var existingAccounts = loadData()
        delete existingAccounts[req.body.id]
        saveData(existingAccounts)
        res.send({ success: true, msg: "Account deleted" })
    }
    catch (e) {
        console.log(e);
        res.send({ success: false, msg: "Account not deleted" })
    }
})

router.put('/updateData/:id', (req, res) => {
    try {
        var existingAccounts = loadData()
        existingAccounts[req.params.id] = req.body
        saveData(existingAccounts)
        res.send({ success: true, msg: "Account updated" })
    }
    catch (e) {
        console.log(e);
        res.send({ success: false, msg: "Account not updated" })
    }
})

const app = express()
// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
// route
app.use('/', router)
//start server

app.listen(options.p, () => {
    console.log(`listening at port:${options.p}`)
})
