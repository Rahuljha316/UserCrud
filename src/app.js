const express = require('express')
require('dotenv').config()

const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json())
app.get('/', (req, res) => {
    res.send("hello")
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`)
});

