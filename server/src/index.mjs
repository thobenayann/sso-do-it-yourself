// Fichier "mjs"
// m pour module
// cela va permettre d'utiliser les imports, ect des modules
// Et non pas les "requires"
import express from 'express'

const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000)
