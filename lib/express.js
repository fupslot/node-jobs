const express = require("express")

const app = express()

app.set("strict routing", true)
app.set("query parser", false)
app.use(express.json({ "strict": true }))

module.exports = app