const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require("method-override")

const Restaurant = require('./models/restaurant')

const routes = require('./routes')
require('./config/mongoose')

const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))

app.use(routes)

app.listen(port, () => {
  console.log(`express is running http://localhost:${port}`)
})

