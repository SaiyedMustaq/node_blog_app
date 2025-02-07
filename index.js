const express = require('express')
path = require('path');
const app = express()
const port = 3000

app.set("view engine", 'ejs');
app.set("views", path.resolve("./views"));


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))