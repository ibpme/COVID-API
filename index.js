const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000;

// const getData = require('./public/getData.js')
// console.log(getData)
app.use(express.static('public'));

app.get("/", function (req, res) {
  let country = req.query.country;
  console.log(country)
  res.status(201).send(`${country}`)
}); 

app.listen(PORT,console.log(`Listening in PORT ${PORT}`))


