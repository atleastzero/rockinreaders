const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

app.set('view engine', 'hbs')
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/about', (req, res) => {
  res.render('about')
})

app.get('/reading-levels', (req, res) => {
  res.render('reading-levels')
})

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Example app listening at port ${port}`))